import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets, expenses } from "../../../common/db/schema";

export default async (id: number, user: string) => {
  const db = getDrizzle();

  const res = await db
    .select({
      ...getTableColumns(budgets),
      total_spend: sql`sum(${expenses.amount})`.mapWith(Number),
      total_item: sql`count(${expenses.id})`.mapWith(Number),
    })
    .from(budgets)
    .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
    .where(and(eq(budgets.createdBy, user), eq(budgets.id, id)))
    .groupBy(budgets.id);

  return res[0];
};
