import { eq } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets } from "../../../common/db/schema";
import { UpdateBudgetDtoType } from "../dtos/update-budget.dto";

export default async (id: number, data: UpdateBudgetDtoType) => {
  const db = getDrizzle();

  await db.update(budgets).set(data).where(eq(budgets.id, id));
};
