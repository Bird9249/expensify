import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

export default createMiddleware(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json(
      {
        message: "You are not logged in.",
      },
      401
    );
  }

  await next();
});
