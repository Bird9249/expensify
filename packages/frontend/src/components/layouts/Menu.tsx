import { A, useLocation } from '@solidjs/router';
import { For, Match, ParentProps, Switch, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';

export type SidebarItem = {
  key?: string;
  label: string;
  icon?: ValidComponent;
  href: string;
  children?: SidebarItem[];
};

export default ({ items }: ParentProps<{ items: SidebarItem[] }>) => {
  const loc = useLocation();

  return (
    <ul class="space-y-1.5">
      <For each={items}>
        {(item) => (
          <Switch>
            <Match when={!item.children}>
              <li>
                <A
                  class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-neutral-700 hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                  href={item.href}
                  classList={{
                    'bg-gray-100': loc.pathname.endsWith(item.href),
                  }}
                >
                  <Dynamic class="size-4 flex-shrink-0" component={item.icon} />
                  {item.label}
                </A>
              </li>
            </Match>

            <Match when={item.children}>
              <li class="hs-accordion" id={`${item.key}`}>
                <button
                  type="button"
                  class="hs-accordion-toggle hs-accordion-active:text-primary-600 flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm hover:bg-gray-100 hs-accordion-active:hover:bg-transparent dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white"
                  classList={{
                    'bg-gray-100': loc.pathname.startsWith(item.href),
                    'text-neutral-700': !loc.pathname.startsWith(item.href),
                  }}
                >
                  <Dynamic class="size-4 flex-shrink-0" component={item.icon} />
                  {item.label}
                  <ChevronUpIcon class="ms-auto hidden size-4 hs-accordion-active:block" />
                  <ChevronDownIcon class="ms-auto block size-4 hs-accordion-active:hidden" />
                </button>

                <div
                  id={`${item.key}-child`}
                  class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                >
                  <ul class="ps-2 pt-2">
                    <For each={item.children}>
                      {(child) => (
                        <li>
                          <a
                            class="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-neutral-700 hover:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300"
                            href={item.href + child.href}
                            classList={{
                              'bg-gray-100':
                                loc.pathname === item.href + child.href,
                            }}
                          >
                            {child.label}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </li>
            </Match>
          </Switch>
        )}
      </For>
    </ul>
  );
};
