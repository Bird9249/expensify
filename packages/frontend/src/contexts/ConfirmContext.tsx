import HSOverlay, { ICollectionItem } from '@preline/overlay';
import {
  createContext,
  createSignal,
  onMount,
  ParentProps,
  Show,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import XIcon from '../components/icons/XIcon';

type ConfirmContextType = {
  show: (title: string, message: string, confirm: () => Promise<void>) => void;
};

export const ConfirmContext = createContext<ConfirmContextType | undefined>();

export const ConfirmProvider = (props: ParentProps<{}>) => {
  const [modal, setModal] = createSignal<HSOverlay>();
  const [message, setMessage] = createStore<{ title: string; message: string }>(
    { title: '', message: '' },
  );

  const [confirm, setConfirm] = createSignal<() => Promise<void>>();
  const [loading, setLoading] = createSignal<boolean>(false);

  onMount(() => {
    const ele = document.getElementById('confirm-modal')!;
    const { element } = HSOverlay.getInstance(
      ele,
      true,
    ) as ICollectionItem<HSOverlay>;
    setModal(element);
  });

  return (
    <ConfirmContext.Provider
      value={{
        show(title, message, confirm) {
          setMessage({ title, message });
          setConfirm(() => confirm);

          modal()?.open();
        },
      }}
    >
      {props.children}
      <button
        data-hs-overlay="#confirm-modal"
        type="button"
        class="hidden"
      ></button>

      <div
        id="confirm-modal"
        class="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden"
      >
        <div class="m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
          <div class="pointer-events-auto relative flex w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
            <div class="absolute end-2 top-2">
              <button
                type="button"
                class="flex size-7 items-center justify-center rounded-lg border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-neutral-700"
                data-hs-overlay="#confirm-modal"
              >
                <span class="sr-only">Close</span>
                <XIcon class="size-4 flex-shrink-0" />
              </button>
            </div>

            <div class="overflow-y-auto p-4 sm:p-10">
              <div class="flex gap-x-4 md:gap-x-7">
                <span class="inline-flex size-[46px] flex-shrink-0 items-center justify-center rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:border-red-600 dark:bg-red-700 dark:text-red-100 sm:h-[62px] sm:w-[62px]">
                  <svg
                    class="size-5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </span>
                <div class="grow">
                  <h3 class="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
                    Delete {message.title}
                  </h3>
                  <p class="text-gray-500 dark:text-neutral-500">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-x-2 border-t bg-gray-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
              <button
                type="button"
                class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                data-hs-overlay="#confirm-modal"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!loading()) {
                    setLoading(true);
                    await confirm()!();
                    setLoading(false);

                    modal()?.close();
                  }
                }}
                type="button"
                class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:pointer-events-none disabled:opacity-50"
              >
                <Show
                  when={loading()}
                  fallback={`Delete ${message.title.toLocaleLowerCase()}`}
                >
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
          </div>
        </div>
      </div>
    </ConfirmContext.Provider>
  );
};
