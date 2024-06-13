import { A } from '@solidjs/router';
import HomeIcon from '../icons/HomeIcon';
import PiggyBankIcon from '../icons/PiggyBankIcon';
import ReceiptTextIcon from '../icons/ReceiptTextIcon';
import Menu from './Menu';

export default () => {
  return (
    <div
      id="application-sidebar"
      class="hs-overlay fixed inset-y-0 start-0 z-[60] hidden w-[260px] -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] hs-overlay-open:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
    >
      <div class="px-8 pt-4">
        <A
          class="text-primary-500 flex gap-x-2 rounded-xl text-xl font-semibold focus:opacity-80 focus:outline-none"
          href="http://localhost:3001/"
          aria-label="Expensify"
        >
          <svg
            class="h-auto w-7 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
          </svg>

          <span>Expensify</span>
        </A>
      </div>

      <nav
        class="hs-accordion-group flex w-full flex-col flex-wrap p-6"
        data-hs-accordion-always-open
      >
        <Menu
          items={[
            { href: '/', icon: HomeIcon, label: 'Dashboard' },
            { href: '/budgets', icon: PiggyBankIcon, label: 'Budgets' },
            { href: '/expenses', icon: ReceiptTextIcon, label: 'Expenses' },
          ]}
        />
      </nav>
    </div>
  );
};
