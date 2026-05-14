"""add creator profile public fields

Revision ID: 20260513_0003
Revises: 20260513_0002
Create Date: 2026-05-13
"""

from alembic import op
import sqlalchemy as sa

revision = "20260513_0003"
down_revision = "20260513_0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {column["name"] for column in inspector.get_columns("creator_profiles")}

    with op.batch_alter_table("creator_profiles") as batch_op:
        if "visibility_settings" not in columns:
            batch_op.add_column(sa.Column("visibility_settings", sa.JSON(), nullable=True))
        if "collaboration_info" not in columns:
            batch_op.add_column(sa.Column("collaboration_info", sa.JSON(), nullable=True))


def downgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {column["name"] for column in inspector.get_columns("creator_profiles")}

    with op.batch_alter_table("creator_profiles") as batch_op:
        if "collaboration_info" in columns:
            batch_op.drop_column("collaboration_info")
        if "visibility_settings" in columns:
            batch_op.drop_column("visibility_settings")
