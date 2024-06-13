import { getAuth } from "@hono/clerk-auth";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import getByIdSchema from "../../common/schemas/get-by-id.schema";
import formatValidate from "../../common/utils/format-validate";
import { CreateBudgetDto } from "./dtos/create-budget.dto";
import { UpdateBudgetDto } from "./dtos/update-budget.dto";
import deleteBudgetRepository from "./repositories/delete-budget.repository";
import getBudgetInfoRepository from "./repositories/get-budget-info.repository";
import getBudgetListRepository from "./repositories/get-budget-list.repository";
import insertBudgetRepository from "./repositories/insert-budget.repository";
import updateBudgetRepository from "./repositories/update-budget.repository";

const budgetRouter = new Hono();

budgetRouter
  .get("/", async (c) => {
    const auth = getAuth(c);
    const clerkClient = c.get("clerk");
    const user = await clerkClient.users.getUser(auth!.userId!);

    const res = await getBudgetListRepository(
      user.emailAddresses[0].emailAddress
    );

    return c.json(res, 200);
  })
  .get(
    "/:id",
    vValidator("param", getByIdSchema, formatValidate),
    async (c) => {
      const auth = getAuth(c);
      const clerkClient = c.get("clerk");
      const user = await clerkClient.users.getUser(auth!.userId!);

      const { id } = c.req.valid("param");

      const res = await getBudgetInfoRepository(
        id,
        user.emailAddresses[0].emailAddress
      );

      return c.json(res, 200);
    }
  )
  .post("/", vValidator("json", CreateBudgetDto, formatValidate), async (c) => {
    await insertBudgetRepository(c.req.valid("json"));

    return c.json(
      {
        message: "Your budget has been successfully created.",
      },
      201
    );
  })
  .put(
    "/:id",
    vValidator("json", UpdateBudgetDto, formatValidate),
    vValidator("param", getByIdSchema, formatValidate),
    async (c) => {
      await updateBudgetRepository(
        c.req.valid("param").id,
        c.req.valid("json")
      );

      return c.json(
        {
          message: "Your budget has been successfully updated.",
        },
        201
      );
    }
  )
  .delete(
    "/:id",
    vValidator("param", getByIdSchema, formatValidate),
    async (c) => {
      const { id } = c.req.valid("param");

      await deleteBudgetRepository(id);

      return c.json(
        {
          message: "Budget Deleted!",
        },
        200
      );
    }
  );

export default budgetRouter;
