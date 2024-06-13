import { getAuth } from "@hono/clerk-auth";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import getByIdSchema from "../../common/schemas/get-by-id.schema";
import formatValidate from "../../common/utils/format-validate";
import { AddExpenseDto } from "./dtos/add-expense.dto";
import addExpenseRepository from "./repositories/add-expense.repository";
import deleteExpenseRepository from "./repositories/delete-expense.repository";
import getAllExpensesRepository from "./repositories/get-all-expenses.repository";
import getExpensesListRepository from "./repositories/get-expenses-list.repository";

const expenseRouter = new Hono();

expenseRouter
  .post("/", vValidator("json", AddExpenseDto, formatValidate), async (c) => {
    await addExpenseRepository(c.req.valid("json"));

    return c.json(
      {
        message: "Expense Added!",
      },
      201
    );
  })
  .get("/", async (c) => {
    const auth = getAuth(c);
    const clerkClient = c.get("clerk");
    const user = await clerkClient.users.getUser(auth!.userId!);

    const result = await getAllExpensesRepository(
      user.emailAddresses[0].emailAddress
    );

    return c.json(result, 200);
  })
  .get(
    "/:id",
    vValidator("param", getByIdSchema, formatValidate),
    async (c) => {
      const auth = getAuth(c);
      const clerkClient = c.get("clerk");
      const user = await clerkClient.users.getUser(auth!.userId!);

      const result = await getExpensesListRepository(
        c.req.valid("param").id,
        user.emailAddresses[0].emailAddress
      );

      return c.json(result, 200);
    }
  )
  .delete(
    "/:id",
    vValidator("param", getByIdSchema, formatValidate),
    async (c) => {
      await deleteExpenseRepository(c.req.valid("param").id);

      return c.json(
        {
          message: "Deletion Successful!",
        },
        200
      );
    }
  );

export default expenseRouter;
