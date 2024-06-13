import {
  emoji,
  InferInput,
  integer,
  minLength,
  minValue,
  number,
  object,
  pipe,
  string,
} from 'valibot';

export const BudgetSchema = object({
  icon: pipe(string(), minLength(1), emoji()),
  name: pipe(string(), minLength(1)),
  amount: pipe(number(), minValue(1), integer()),
});

export type BudgetSchemaType = InferInput<typeof BudgetSchema>;
