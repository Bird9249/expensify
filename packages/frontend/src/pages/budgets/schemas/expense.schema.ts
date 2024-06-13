import {
  InferInput,
  integer,
  minLength,
  minValue,
  number,
  object,
  pipe,
  string,
} from 'valibot';

export const ExpenseSchema = object({
  name: pipe(string(), minLength(1)),
  amount: pipe(number(), minValue(1), integer()),
});

export type ExpenseSchemaType = InferInput<typeof ExpenseSchema>;
