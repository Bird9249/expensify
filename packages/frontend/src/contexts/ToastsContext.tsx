import {
  createContext,
  createEffect,
  createSignal,
  on,
  ParentProps,
  Show,
} from 'solid-js';
import { Transition } from 'solid-transition-group';
import XIcon from '../components/icons/XIcon';

type ToastsContextType = {
  show: (message: string) => void;
  close?: () => void;
};

export const ToastsContext = createContext<ToastsContextType | undefined>();

export const ToastsProvider = (props: ParentProps<{}>) => {
  const [show, setShow] = createSignal<boolean>(false);
  const [message, setMessage] = createSignal<string>('');

  createEffect(
    on(show, (input) => {
      if (input) {
        setTimeout(() => {
          setShow(false);
        }, 5000);
      }
    }),
  );

  return (
    <ToastsContext.Provider
      value={{
        show(message) {
          setShow(true);
          setMessage(message);
        },
        close() {
          setShow(false);
        },
      }}
    >
      <div class="absolute end-10 top-10 z-50">
        <Transition name="slide-fade">
          <Show when={show()}>
            <div
              class="max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
              role="alert"
            >
              <div class="flex p-4">
                <div class="flex-shrink-0">
                  <svg
                    class="mt-0.5 size-4 flex-shrink-0 text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                  </svg>
                </div>

                <div class="ms-3">
                  <p class="text-sm text-gray-700 dark:text-neutral-400">
                    {message()}
                  </p>
                </div>

                <div class="ms-3 flex items-center">
                  <button
                    type="button"
                    class="inline-flex size-5 flex-shrink-0 items-center justify-center rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none dark:text-white"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span class="sr-only">Close</span>
                    <XIcon class="size-4 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </Show>
        </Transition>
      </div>
      {props.children}
    </ToastsContext.Provider>
  );
};
