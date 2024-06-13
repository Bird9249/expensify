import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets, expenses } from "../../../common/db/schema";

export default async (budgetId: number, user: string) => {
  const db = getDrizzle();

  return await db
    .select({
      ...getTableColumns(expenses),
    })
    .from(expenses)
    .leftJoin(budgets, eq(expenses.budgetId, budgets.id))
    .where(and(eq(budgets.createdBy, user), eq(expenses.budgetId, budgetId)))
    .orderBy(desc(expenses.createdAt));
};
