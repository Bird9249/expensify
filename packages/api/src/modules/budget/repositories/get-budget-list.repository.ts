import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets, expenses } from "../../../common/db/schema";

export default async (user: string) => {
  const db = getDrizzle();

  return await db
    .select({
      ...getTableColumns(budgets),
      total_spend: sql`sum(${expenses.amount})`.mapWith(Number),
      total_item: sql`count(${expenses.id})`.mapWith(Number),
    })
    .from(budgets)
    .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
    .where(eq(budgets.createdBy, user))
    .groupBy(budgets.id)
    .orderBy(desc(budgets.id));
};
