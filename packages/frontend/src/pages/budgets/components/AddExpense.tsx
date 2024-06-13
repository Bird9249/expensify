import {
  createForm,
  reset,
  setValue,
  SubmitHandler,
  valiForm,
} from '@modular-forms/solid';
import { useParams } from '@solidjs/router';
import { ParentProps, Show, useContext } from 'solid-js';
import NumberInput from '../../../components/form/NumberInput';
import TextInput from '../../../components/form/TextInput';
import { ToastsContext } from '../../../contexts/ToastsContext';
import addExpenseApi from '../apis/add-expense.api';
import { ExpenseSchema, ExpenseSchemaType } from '../schemas/expense.schema';

type Props = ParentProps<{
  onSuccess: () => Promise<void>;
}>;

export default ({ onSuccess }: Props) => {
  const toasts = useContext(ToastsContext);
  const params = useParams();

  const [form, { Form, Field }] = createForm<ExpenseSchemaType>({
    validate: valiForm(ExpenseSchema),
  });

  const handleSubmit: SubmitHandler<ExpenseSchemaType> = async (values) => {
    const res = await addExpenseApi({
      ...values,
      budget_id: Number(params.id),
    });
    reset(form);
    await onSuccess();
    toasts?.show(res.data.message);
  };

  return (
    <div class="bg-white rounded-xl shadow p-4 sm:p-7 border dark:bg-neutral-900 dark:border-neutral-800">
      <div class="sm:col-span-12 mb-2 sm:mb-4">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
          Add expense
        </h2>
      </div>

      <Form onSubmit={handleSubmit}>
        <div class="flex flex-col gap-y-4 overflow-y-auto">
          <Field name="name">
            {(field, props) => (
              <TextInput
                label="Expense name"
                {...props}
                type="text"
                placeholder="enter expense name"
                required
                error={field.error}
                value={field.value}
              />
            )}
          </Field>
          <Field name="amount" type="number">
            {(field, props) => (
              <NumberInput
                label="Expense amount"
                onInputValue={(e) => {
                  setValue(form, 'amount', e ? e : 0);
                }}
                name={props.name}
                ref={props.ref}
                required
                error={field.error}
                value={field.value}
              />
            )}
          </Field>

          <button
            type={form.submitting ? 'button' : 'submit'}
            class="justify-center bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-white disabled:pointer-events-none disabled:opacity-50"
          >
            <Show when={form.submitting} fallback={'Add new expense'}>
              <span
                class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                role="status"
                aria-label="loading"
              >
                <span class="sr-only">Loading...</span>
              </span>
              Loading
            </Show>
          </button>
        </div>
      </Form>
    </div>
  );
};
