import { Hono } from "hono";
import getTotalRepository from "./repositories/get-total.repository";

const dashboardRouter = new Hono();

dashboardRouter.get("/total", async (c) => {
  const result = await getTotalRepository();

  return c.json(result, 200);
});

export default dashboardRouter;
