import {
  Accessor,
  createContext,
  createSignal,
  For,
  Match,
  ParentProps,
  Setter,
  Switch,
} from "solid-js";

interface IBreadcrumbContext {
  items: Accessor<string[]>;
  setItems: Setter<string[]>;
}

export const BreadcrumbContext = createContext<
  IBreadcrumbContext | undefined
>();

const ArrowIcon = () => (
  <svg
    class="mx-3 size-2.5 flex-shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export const BreadcrumbProvider = (props: ParentProps) => {
  const [items, setItems] = createSignal<string[]>(["Application Layout"]);

  return (
    <BreadcrumbContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      <div class="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 dark:border-neutral-700 dark:bg-neutral-800 sm:px-6 md:px-8 lg:hidden">
        <div class="flex items-center justify-between py-2">
          <ol class="ms-3 flex items-center whitespace-nowrap">
            <For each={items()}>
              {(item, idx) => (
                <Switch>
                  <Match when={idx() !== items().length - 1}>
                    <li class="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                      {item}
                      <ArrowIcon />
                    </li>
                  </Match>
                  <Match when={idx() === items().length - 1}>
                    <li
                      class="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400"
                      aria-current="page"
                    >
                      {item}
                    </li>
                  </Match>
                </Switch>
              )}
            </For>
          </ol>

          <button
            type="button"
            class="flex items-center justify-center gap-x-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:text-gray-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Sidebar"
          >
            <svg
              class="size-4 flex-shrink-0"
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
              <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
            </svg>
            <span class="sr-only">Sidebar</span>
          </button>
        </div>
      </div>
      {props.children}
    </BreadcrumbContext.Provider>
  );
};
