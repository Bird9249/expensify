import {
  InferOutput,
  maxLength,
  minLength,
  number,
  object,
  pipe,
  string,
  transform,
} from "valibot";

export const AddExpenseDto = object({
  name: pipe(string(), minLength(1), maxLength(255)),
  amount: pipe(
    number(),
    transform((input) => String(input))
  ),
  budget_id: number(),
});

export type AddExpenseDtoType = InferOutput<typeof AddExpenseDto>;
