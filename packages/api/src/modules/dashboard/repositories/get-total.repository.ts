import { sql } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets, expenses } from "../../../common/db/schema";

export default async () => {
  const db = getDrizzle();

  const totalExpense = await db
    .select({
      total_spend: sql<number>`SUM(${expenses.amount})`,
      total_budgets: sql<number>`COUNT(${budgets.id})`,
    })
    .from(budgets)
    .leftJoin(expenses, sql`${expenses.budgetId} = ${budgets.id}`);

  const totalBudget = await db
    .select({
      total_budget_amount: sql<number>`SUM(${budgets.amount})`,
    })
    .from(budgets);

  return {
    ...totalExpense[0],
    ...totalBudget[0],
  };
};
