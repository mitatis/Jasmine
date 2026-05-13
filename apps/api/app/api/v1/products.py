from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.permissions import require_brand_access, require_merchant_user, user_org_ids
from app.db.session import get_db
from app.models.entities import BrandProfile, Product, ProductImage, User
from app.schemas import ProductCreate, ProductImageCreate, ProductImageRead, ProductRead

router = APIRouter(tags=["products"])


@router.get("/products", response_model=list[ProductRead])
def list_products(db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> list[Product]:
    require_merchant_user(user)
    org_ids = user_org_ids(db, user.id)
    brand_ids = select(BrandProfile.id).where(BrandProfile.org_id.in_(org_ids))
    return list(db.scalars(select(Product).where(Product.brand_id.in_(brand_ids))))


@router.post("/products", response_model=ProductRead)
def create_product(payload: ProductCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Product:
    require_merchant_user(user)
    require_brand_access(db, user, payload.brand_id)
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.get("/products/{product_id}", response_model=ProductRead)
def get_product(product_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Product:
    require_merchant_user(user)
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    require_brand_access(db, user, product.brand_id)
    return product


@router.patch("/products/{product_id}", response_model=ProductRead)
def update_product(product_id: str, payload: ProductCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> Product:
    require_merchant_user(user)
    product = get_product(product_id, db, user)
    for key, value in payload.model_dump().items():
        setattr(product, key, value)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.post("/products/{product_id}/images", response_model=ProductImageRead)
def add_product_image(product_id: str, payload: ProductImageCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> ProductImage:
    require_merchant_user(user)
    product = get_product(product_id, db, user)
    image = ProductImage(product_id=product.id, **payload.model_dump())
    if image.is_primary:
        for existing in db.scalars(select(ProductImage).where(ProductImage.product_id == product.id)):
            existing.is_primary = False
    db.add(image)
    db.commit()
    db.refresh(image)
    return image


@router.delete("/product-images/{image_id}")
def delete_product_image(image_id: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)) -> dict[str, str]:
    require_merchant_user(user)
    image = db.get(ProductImage, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found.")
    product = db.get(Product, image.product_id)
    require_brand_access(db, user, product.brand_id)
    image.deleted_at = datetime.now(UTC)
    db.add(image)
    db.commit()
    return {"status": "deleted"}
