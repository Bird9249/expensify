import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { initializeDrizzleDb } from "./common/db";
import IEnv from "./common/interfaces/env.interface";
import authMiddleware from "./common/middlewares/auth.middleware";
import budgetRouter from "./modules/budget/budget.router";
import dashboardRouter from "./modules/dashboard/dashboard.router";
import expenseRouter from "./modules/expense/expense.router";

const app = new Hono();

app.use(
  "*",
  cors(),
  clerkMiddleware(),
  async (c, next) => {
    initializeDrizzleDb(env<IEnv>(c).DB_URL);
    await next();
  },
  authMiddleware
);

app.get("/auth", async (c) => {
  const auth = getAuth(c);

  if (auth && auth.userId) {
    const clerkClient = c.get("clerk");

    try {
      const user = await clerkClient.users.getUser(auth.userId);

      return c.json({
        user,
      });
    } catch (e) {
      return c.json(
        {
          message: "User not found.",
        },
        404
      );
    }
  }
});

app
  .route("/budget", budgetRouter)
  .route("/expense", expenseRouter)
  .route("/dashboard", dashboardRouter);

export default app;
