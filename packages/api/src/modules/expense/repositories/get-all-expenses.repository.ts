import { desc, eq, getTableColumns } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets, expenses } from "../../../common/db/schema";

export default async (user: string) => {
  const db = getDrizzle();

  return await db
    .select({
      ...getTableColumns(expenses),
    })
    .from(expenses)
    .leftJoin(budgets, eq(expenses.budgetId, budgets.id))
    .where(eq(budgets.createdBy, user))
    .orderBy(desc(expenses.createdAt));
};
