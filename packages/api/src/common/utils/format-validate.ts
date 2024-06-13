import { Context } from "hono";
import { flatten, ObjectSchema, SafeParseResult } from "valibot";

export default (result: SafeParseResult<ObjectSchema<any>>, c: Context) => {
  if (!result.success) {
    return c.json(flatten(result.issues), 400);
  }
};
