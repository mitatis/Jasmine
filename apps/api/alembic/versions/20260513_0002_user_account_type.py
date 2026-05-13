"""add isolated account types

Revision ID: 20260513_0002
Revises: 20260513_0001
Create Date: 2026-05-13
"""

from alembic import op
import sqlalchemy as sa

revision = "20260513_0002"
down_revision = "20260513_0001"
branch_labels = None
depends_on = None


NAMING_CONVENTION = {
    "uq": "uq_%(table_name)s_%(column_0_name)s",
}


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {column["name"] for column in inspector.get_columns("users")}
    unique_constraints = inspector.get_unique_constraints("users")
    indexes = inspector.get_indexes("users")
    has_account_type = "account_type" in columns
    has_account_type_unique = any(
        constraint.get("column_names") == ["account_type", "email"] for constraint in unique_constraints
    )
    email_unique_names = [
        constraint.get("name") or "uq_users_email"
        for constraint in unique_constraints
        if constraint.get("column_names") == ["email"]
    ]
    has_account_type_index = any(index.get("name") == "ix_users_account_type" for index in indexes)

    if not has_account_type:
        with op.batch_alter_table("users", naming_convention=NAMING_CONVENTION) as batch_op:
            batch_op.add_column(sa.Column("account_type", sa.String(length=32), nullable=False, server_default="merchant"))
            for name in email_unique_names:
                batch_op.drop_constraint(name, type_="unique")
            if not has_account_type_unique:
                batch_op.create_unique_constraint("uq_users_account_type_email", ["account_type", "email"])
            if not has_account_type_index:
                batch_op.create_index("ix_users_account_type", ["account_type"])

        with op.batch_alter_table("users") as batch_op:
            batch_op.alter_column("account_type", server_default=None)
        return

    with op.batch_alter_table("users", naming_convention=NAMING_CONVENTION) as batch_op:
        for name in email_unique_names:
            batch_op.drop_constraint(name, type_="unique")
        if not has_account_type_unique:
            batch_op.create_unique_constraint("uq_users_account_type_email", ["account_type", "email"])
        if not has_account_type_index:
            batch_op.create_index("ix_users_account_type", ["account_type"])


def downgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {column["name"] for column in inspector.get_columns("users")}
    indexes = inspector.get_indexes("users")
    unique_constraints = inspector.get_unique_constraints("users")
    has_email_unique = any(constraint.get("column_names") == ["email"] for constraint in unique_constraints)
    has_account_type_unique = any(
        constraint.get("column_names") == ["account_type", "email"] for constraint in unique_constraints
    )
    has_account_type_index = any(index.get("name") == "ix_users_account_type" for index in indexes)

    with op.batch_alter_table("users") as batch_op:
        if has_account_type_index:
            batch_op.drop_index("ix_users_account_type")
        if has_account_type_unique:
            batch_op.drop_constraint("uq_users_account_type_email", type_="unique")
        if not has_email_unique:
            batch_op.create_unique_constraint("uq_users_email", ["email"])
        if "account_type" in columns:
            batch_op.drop_column("account_type")
