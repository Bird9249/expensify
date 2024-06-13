import { relations, sql } from "drizzle-orm";
import {
  bigint,
  customType,
  decimal,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const charUtf8mb4Unicode = customType<{
  data: string;
  notNull: true;
}>({
  dataType() {
    return "CHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
  },
});

export const budgets = mysqlTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  icon: charUtf8mb4Unicode("icon").notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
});

export const budgetsRelations = relations(budgets, ({ many }) => ({
  expenses: many(expenses),
}));

export const expenses = mysqlTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).default("0"),
  budgetId: bigint("budget_id", { unsigned: true, mode: "number" })
    .references(() => budgets.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  budget: one(budgets, {
    fields: [expenses.budgetId],
    references: [budgets.id],
  }),
}));
