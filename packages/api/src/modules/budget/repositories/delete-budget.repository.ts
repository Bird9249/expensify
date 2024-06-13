import { eq } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { budgets } from "../../../common/db/schema";

export default async (id: number) => {
  const db = getDrizzle();

  await db.delete(budgets).where(eq(budgets.id, id));
};
