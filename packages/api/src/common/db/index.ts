import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import * as schema from "./schema";

let _drizzle!: MySql2Database<typeof schema>;

export function getDrizzle() {
  if (!_drizzle) {
    throw new Error("Drizzle not set");
  }
  return _drizzle;
}

export function initializeDrizzleDb(dbUrl: string) {
  if (!_drizzle) {
    const pool = createPool(dbUrl);

    _drizzle = drizzle(pool, { schema, mode: "default" });
  }
}
