import { ParentProps, ValidComponent } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type Props = ParentProps<{
  label: string;
  total: string;
  icon: ValidComponent;
}>;

export default ({ icon, label, total }: Props) => {
  return (
    <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <div class="p-4 md:p-5 flex gap-x-4">
        <div class="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
          <Dynamic
            component={icon}
            class="flex-shrink-0 size-5 text-gray-600 dark:text-neutral-400"
          />
        </div>

        <div class="grow">
          <div class="flex items-center gap-x-2">
            <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
              {label}
            </p>
          </div>
          <div class="mt-1 flex items-center gap-x-2">
            <h3 class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
              {total}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
