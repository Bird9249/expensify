import { eq } from "drizzle-orm";
import { getDrizzle } from "../../../common/db";
import { expenses } from "../../../common/db/schema";

export default async (id: number) => {
  const db = getDrizzle();

  await db.delete(expenses).where(eq(expenses.id, id));
};
