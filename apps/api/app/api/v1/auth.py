from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.entities import User
from app.schemas import LoginRequest, TokenResponse, UserCreate, UserRead
from app.services.auth_service import authenticate_user, register_user

router = APIRouter(prefix="/auth", tags=["auth"])


def _set_cookie(response: Response, token: str) -> None:
    response.set_cookie("access_token", token, httponly=True, secure=False, samesite="lax", max_age=60 * 60 * 24 * 7)


@router.post("/register", response_model=TokenResponse)
def register(payload: UserCreate, response: Response, db: Session = Depends(get_db)) -> TokenResponse:
    if not payload.account_type:
        raise HTTPException(status_code=400, detail="account_type is required.")
    return _register(payload, response, db, payload.account_type)


@router.post("/{account_type}/register", response_model=TokenResponse)
def register_for_account_type(
    account_type: str,
    payload: UserCreate,
    response: Response,
    db: Session = Depends(get_db),
) -> TokenResponse:
    if account_type not in {"merchant", "creator"}:
        raise HTTPException(status_code=404, detail="Account type not found.")
    return _register(payload, response, db, account_type)


def _register(payload: UserCreate, response: Response, db: Session, account_type: str) -> TokenResponse:
    try:
        _, token = register_user(
            db,
            email=payload.email,
            password=payload.password,
            account_type=account_type,  # type: ignore[arg-type]
            display_name=payload.display_name,
        )
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email is already registered for this account type.") from exc
    _set_cookie(response, token)
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)) -> TokenResponse:
    if not payload.account_type:
        raise HTTPException(status_code=400, detail="account_type is required.")
    return _login(payload, response, db, payload.account_type)


@router.post("/{account_type}/login", response_model=TokenResponse)
def login_for_account_type(
    account_type: str,
    payload: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
) -> TokenResponse:
    if account_type not in {"merchant", "creator"}:
        raise HTTPException(status_code=404, detail="Account type not found.")
    return _login(payload, response, db, account_type)


def _login(payload: LoginRequest, response: Response, db: Session, account_type: str) -> TokenResponse:
    _, token = authenticate_user(
        db,
        email=payload.email,
        password=payload.password,
        account_type=account_type,  # type: ignore[arg-type]
    )
    if not token:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    _set_cookie(response, token)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserRead)
def me(user: User = Depends(get_current_user)) -> User:
    return user


@router.post("/logout")
def logout(response: Response) -> dict[str, str]:
    response.delete_cookie("access_token")
    return {"status": "ok"}
