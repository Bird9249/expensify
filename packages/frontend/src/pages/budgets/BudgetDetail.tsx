import { useNavigate, useParams } from '@solidjs/router';
import Big from 'big.js';
import {
  createEffect,
  createResource,
  createSignal,
  on,
  onCleanup,
  Show,
  useContext,
} from 'solid-js';
import TrashIcon from '../../components/icons/TrashIcon';
import { BreadcrumbContext } from '../../contexts/BreadcrumbContext';
import { ConfirmContext } from '../../contexts/ConfirmContext';
import { ToastsContext } from '../../contexts/ToastsContext';
import deleteBudgetApi from './apis/delete-budget.api';
import getBudgetInfoApi from './apis/get-budget-info.api';
import AddExpense from './components/AddExpense';
import EditBudget from './components/EditBudget';
import ExpenseListTable from './components/ExpenseListTable';
import calculateProgressPerc from './utils/calculate-progress-perc';

export default () => {
  const confirm = useContext(ConfirmContext);
  const toast = useContext(ToastsContext)!;
  const { setItems } = useContext(BreadcrumbContext)!;
  setItems((prev) => [...prev, 'Budgets']);
  onCleanup(() => {
    setItems((prev) => {
      prev.pop();
      prev.pop();
      return [...prev];
    });
  });

  const nav = useNavigate();

  const params = useParams();
  const [id] = createSignal<string>(params.id);
  const [budget, { refetch }] = createResource(id, getBudgetInfoApi);

  createEffect(
    on(budget, (input) => {
      if (input) {
        setItems((prev) => [...prev, input.data.name]);
      }
    }),
  );

  return (
    <>
      <div class="flex flex-wrap justify-between items-center gap-2">
        <h2 class="inline-block text-xl text-gray-800 font-semibold dark:text-neutral-200">
          My Expenses
        </h2>

        <div class="flex gap-2">
          <Show when={budget()}>
            <EditBudget
              name={budget()!.data.name}
              icon={budget()!.data.icon}
              amount={Number(budget()!.data.amount)}
              onSuccess={async () => {
                await refetch();
              }}
            />
          </Show>

          <button
            onClick={() => {
              confirm?.show(
                'Budget',
                'Are you sure you want to delete this budget',
                async () => {
                  const res = await deleteBudgetApi(id());
                  toast.show(res.data.message);
                  setTimeout(() => {
                    nav('/budgets');
                  }, 500);
                },
              );
            }}
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <TrashIcon class="flex-shrink-0 size-4" />
            Delete
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        <div>
          <Show
            when={budget()}
            fallback={
              <div class="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
                <div class="p-4 md:p-5">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <span class="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
                    </div>

                    <div class="ms-4 mt-2 w-full">
                      <p
                        class="h-4 bg-gray-200 rounded-full dark:bg-neutral-700"
                        style="width: 40%;"
                      ></p>

                      <ul class="mt-5 space-y-3">
                        <li class="w-full h-3 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                        <li class="w-full h-3 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <div class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
              <div class="p-4 md:p-5">
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center">
                    <span class="size-[38px] rounded-full flex justify-center items-center bg-gray-100">
                      {budget()!.data.icon}
                    </span>

                    <div class="ms-3">
                      <h3 class="font-medium text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                        {budget()!.data.name}
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-neutral-500">
                        {budget()!.data.total_item} Item
                      </p>
                    </div>
                  </div>

                  <div class="ps-3">
                    <p class="text-primary-600 font-semibold">
                      {budget()!.data.amount}
                    </p>
                  </div>
                </div>

                <div>
                  <div class="mb-2 flex justify-between items-center">
                    <h3 class="text-sm text-gray-800 dark:text-white">
                      {(budget()!.data.total_spend || 0).toFixed(2)}
                    </h3>
                    <span class="text-sm text-gray-800 dark:text-white">
                      {new Big(budget()!.data.amount)
                        .minus(new Big(budget()!.data.total_spend || 0))
                        .toFixed(2)}
                    </span>
                  </div>
                  <div
                    class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                    role="progressbar"
                    aria-valuenow={calculateProgressPerc(
                      budget()!.data.total_spend || 0,
                      budget()!.data.amount,
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      class="flex flex-col justify-center rounded-full overflow-hidden bg-primary-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-primary-500"
                      style={`width: ${calculateProgressPerc(budget()!.data.total_spend || 0, budget()!.data.amount)}%`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </div>

        <div>
          <AddExpense
            onSuccess={async () => {
              await refetch();
            }}
          />
        </div>
      </div>

      <ExpenseListTable
        budgetState={budget}
        onSuccess={async () => {
          await refetch();
        }}
      />
    </>
  );
};
