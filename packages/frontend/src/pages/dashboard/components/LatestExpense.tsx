import { createResource, For, Match, Show, Switch, useContext } from 'solid-js';
import TrashIcon from '../../../components/icons/TrashIcon';
import { ConfirmContext } from '../../../contexts/ConfirmContext';
import { ToastsContext } from '../../../contexts/ToastsContext';
import deleteExpenseApi from '../../budgets/apis/delete-expense.api';
import getLatestExpenseApi from '../apis/get-latest-expense.api';

export default () => {
  const toasts = useContext(ToastsContext)!;
  const confirm = useContext(ConfirmContext)!;

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'amount',
      label: 'Amount',
    },
    {
      key: 'createdAt',
      label: 'Date',
    },
    {
      key: 'id',
      label: 'Action',
    },
  ];

  const [expenses, { refetch }] = createResource(getLatestExpenseApi);

  return (
    <div class="rounded-xl p-4 md:p-5 border bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
          Latest Expenses
        </h2>
      </div>

      <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead class="bg-gray-50 dark:bg-neutral-900">
          <tr>
            <For each={columns}>
              {(col) => (
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      {col.label}
                    </span>
                  </div>
                </th>
              )}
            </For>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
          <Show when={expenses()}>
            <For each={expenses()?.data}>
              {(expense) => (
                <tr class="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                  <For each={columns}>
                    {(col) => (
                      <Switch>
                        <Match when={col.key !== 'id'}>
                          <td class="size-px whitespace-nowrap">
                            <span class="block px-6 py-2">
                              <span class="text-sm text-gray-600 dark:text-neutral-400">
                                {
                                  expense[
                                    col.key as
                                      | 'name'
                                      | 'amount'
                                      | 'createdAt'
                                      | 'id'
                                  ]
                                }
                              </span>
                            </span>
                          </td>
                        </Match>
                        <Match when={col.key === 'id'}>
                          <td class="size-px whitespace-nowrap">
                            <button
                              type="button"
                              class="block"
                              onClick={() => {
                                confirm.show(
                                  'Expense',
                                  'Are you sure you want to delete this expense',
                                  async () => {
                                    const res = await deleteExpenseApi(
                                      String(expense.id),
                                    );
                                    toasts.show(res.data.message);
                                    await refetch();
                                  },
                                );
                              }}
                            >
                              <span class="px-6 py-1.5">
                                <span class="py-1 px-2 inline-flex text-red-500 justify-center items-center gap-2 rounded-lg border font-medium bg-white shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                  <TrashIcon class="flex-shrink-0 size-4" />
                                  Delete
                                </span>
                              </span>
                            </button>
                          </td>
                        </Match>
                      </Switch>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
    </div>
  );
};
