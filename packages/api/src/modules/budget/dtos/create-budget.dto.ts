import {
  InferOutput,
  maxLength,
  minLength,
  number,
  object,
  pipe,
  string,
  transform
} from "valibot";

export const CreateBudgetDto = object({
  name: pipe(string(), minLength(1), maxLength(255)),
  amount: pipe(number(), transform((input) => String(input))),
  icon: pipe(string(), maxLength(255)),
  createdBy: pipe(string(), minLength(1), maxLength(255)),
});

export type CreateBudgetDtoType = InferOutput<typeof CreateBudgetDto>;
