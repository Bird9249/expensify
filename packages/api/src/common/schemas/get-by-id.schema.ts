import { object, pipe, string, transform } from "valibot";

export default object({
  id: pipe(
    string(),
    transform((input) => Number(input))
  ),
});
