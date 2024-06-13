import { createResource, onCleanup, Show, useContext } from 'solid-js';
import PiggyBankIcon from '../../components/icons/PiggyBankIcon';
import ReceiptTextIcon from '../../components/icons/ReceiptTextIcon';
import WalletIcon from '../../components/icons/WalletIcon';
import { BreadcrumbContext } from '../../contexts/BreadcrumbContext';
import getBudgetListApi from '../budgets/apis/get-budget-list.api';
import getTotalApi from './apis/get-total.api';
import ActivityBarChart from './components/ActivityBarChart';
import LatestBudget from './components/LatestBudget';
import Stats from './components/Stats';

export default () => {
  const { setItems } = useContext(BreadcrumbContext)!;
  setItems((prev) => [...prev, 'Dashboard']);
  onCleanup(() => {
    setItems((prev) => {
      prev.pop();
      return [...prev];
    });
  });

  const [totals] = createResource(getTotalApi);
  const [budgets] = createResource(getBudgetListApi);

  return (
    <>
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Hi, Game Play
        </h2>
        <p class="text-sm text-gray-600 dark:text-neutral-400">
          Here's what happening with your money, Let's Manage your expense
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Show when={totals()}>
          <Stats
            icon={PiggyBankIcon}
            label="Total Budget"
            total={totals()!.data.total_budget_amount}
          />
          <Stats
            icon={ReceiptTextIcon}
            label="Total Spend"
            total={totals()!.data.total_spend}
          />
          <Stats
            icon={WalletIcon}
            label="No. Of Budget"
            total={totals()!.data.total_budgets.toLocaleString()}
          />
        </Show>
      </div>

      <div class="grid md:grid-cols-3 gap-4 sm:gap-6">
        <ActivityBarChart budgets={budgets} />

        <LatestBudget budgets={budgets} />
      </div>
    </>
  );
};
