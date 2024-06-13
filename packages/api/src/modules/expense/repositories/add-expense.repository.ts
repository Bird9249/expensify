import { getDrizzle } from "../../../common/db";
import { expenses } from "../../../common/db/schema";
import { AddExpenseDtoType } from "../dtos/add-expense.dto";

export default async (input: AddExpenseDtoType) => {
  const db = getDrizzle();

  await db.insert(expenses).values({ ...input, budgetId: input.budget_id });
};
