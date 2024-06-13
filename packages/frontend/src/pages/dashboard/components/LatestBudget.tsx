import { A, useLocation } from '@solidjs/router';
import { AxiosResponse } from 'axios';
import Big from 'big.js';
import { For, ParentProps, Resource, Show } from 'solid-js';
import calculateProgressPerc from '../../budgets/utils/calculate-progress-perc';

type Props = ParentProps<{
  budgets: Resource<
    AxiosResponse<
      {
        total_spend: number;
        total_item: number;
        id: number;
        name: string;
        amount: string;
        icon: string;
        createdBy: string;
      }[],
      any
    >
  >;
}>;

export default ({ budgets }: Props) => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div class="col-span-1">
      <h3 class="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-3 sm:mb-6">
        Latest Budgets
      </h3>

      <div class="flex flex-col gap-4">
        <Show
          when={budgets()}
          fallback={
            <For each={Array.from<number>([1, 2])}>
              {() => (
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
              )}
            </For>
          }
        >
          <For each={budgets()?.data}>
            {(budget) => (
              <A
                href={`budgets/${budget.id}`}
                class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
              >
                <div class="p-4 md:p-5">
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center">
                      <span class="size-[38px] rounded-full flex justify-center items-center bg-gray-100">
                        {budget.icon}
                      </span>

                      <div class="ms-3">
                        <h3 class="font-medium text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                          {budget.name}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-neutral-500">
                          {budget.total_item} Item
                        </p>
                      </div>
                    </div>

                    <div class="ps-3">
                      <p class="text-primary-600 font-semibold">
                        {budget.amount}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div class="mb-2 flex justify-between items-center">
                      <h3 class="text-sm text-gray-800 dark:text-white">
                        {(budget.total_spend || 0).toFixed(2)}
                      </h3>
                      <span class="text-sm text-gray-800 dark:text-white">
                        {new Big(budget.amount)
                          .minus(new Big(budget.total_spend || 0))
                          .toFixed(2)}
                      </span>
                    </div>
                    <div
                      class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                      role="progressbar"
                      aria-valuenow={calculateProgressPerc(
                        budget.total_spend || 0,
                        budget.amount,
                      )}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="flex flex-col justify-center rounded-full overflow-hidden bg-primary-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-primary-500"
                        style={`width: ${calculateProgressPerc(budget.total_spend || 0, budget.amount)}%`}
                      ></div>
                    </div>
                  </div>
                </div>
              </A>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};
