import { A } from '@solidjs/router';
import { useContext } from 'solid-js';
import { ClerkContext } from '../../contexts/ClerkContext';
import LogOutIcon from '../icons/LogOutIcon';

export default () => {
  const clerk = useContext(ClerkContext)!;

  return (
    <header class="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-800 sm:flex-nowrap sm:justify-start sm:py-4 lg:ps-64">
      <nav
        class="mx-auto flex w-full basis-full items-center px-4 sm:px-6"
        aria-label="Global"
      >
        <div class="me-5 lg:me-0 lg:hidden">
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

        <div class="ms-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
          <div class="hidden sm:block"></div>

          <div class="flex flex-row items-center justify-end gap-2">
            <div class="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button
                id="hs-dropdown-with-header"
                type="button"
                class="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
              >
                <img
                  class="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-neutral-800"
                  src={clerk.user?.imageUrl}
                  alt="Image Description"
                />
              </button>

              <div
                class="hs-dropdown-menu duration hidden min-w-60 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:border dark:border-neutral-700 dark:bg-neutral-900"
                aria-labelledby="hs-dropdown-with-header"
              >
                <div class="-m-2 rounded-t-lg bg-gray-100 px-5 py-3 dark:bg-neutral-800">
                  <p class="text-sm text-gray-500 dark:text-neutral-400">
                    Signed in as
                  </p>
                  <p class="text-sm font-medium text-gray-800 dark:text-neutral-300">
                    {clerk.user?.emailAddresses.toString()}
                  </p>
                </div>
                <div class="mt-2 py-2 first:pt-0 last:pb-0">
                  <button
                    class="focus:ring-primary-500 flex w-full items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    onClick={() => {
                      clerk.signOut({
                        redirectUrl: `http://localhost:3001/login`,
                      });
                    }}
                  >
                    <LogOutIcon class="size-4 flex-shrink-0" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
