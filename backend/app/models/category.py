from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Category(Base):
    __tablename__ = "categories"
    __table_args__ = (UniqueConstraint("user_id", "name", name="uq_category_user_name"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    icon: Mapped[str | None] = mapped_column(String(50), nullable=True)
    color: Mapped[str | None] = mapped_column(String(7), nullable=True)

    user: Mapped["User"] = relationship(back_populates="categories")  # type: ignore[name-defined]
    expenses: Mapped[list["Expense"]] = relationship(  # type: ignore[name-defined]
        back_populates="category"
    )
    budgets: Mapped[list["Budget"]] = relationship(  # type: ignore[name-defined]
        back_populates="category"
    )
