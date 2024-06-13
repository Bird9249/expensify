import { getDrizzle } from "../../../common/db";
import { budgets } from "../../../common/db/schema";
import { CreateBudgetDtoType } from "../dtos/create-budget.dto";

export default async (data: CreateBudgetDtoType) => {
  const db = getDrizzle();

  await db.insert(budgets).values(data);
};
