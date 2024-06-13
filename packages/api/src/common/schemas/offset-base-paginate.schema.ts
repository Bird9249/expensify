import { object, optional, pipe, string, transform } from "valibot";

export default object({
  offset: pipe(
    optional(string()),
    transform((input) => (input ? Number(input) : undefined))
  ),
  limit: pipe(
    optional(string()),
    transform((input) => (input ? Number(input) : undefined))
  ),
});
