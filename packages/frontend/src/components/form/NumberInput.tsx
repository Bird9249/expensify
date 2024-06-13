import { HSInputNumber } from 'preline';
import { onMount, ParentProps, Show, splitProps } from 'solid-js';
import InfoIcon from '../icons/InfoIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

type NumberInputProps = {
  name: string;
  label?: string;
  value: number | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInputValue: (input: number) => void;
};

export default (props: ParentProps<NumberInputProps>) => {
  const [, inputProps] = splitProps(props, [
    'value',
    'label',
    'error',
    'onInputValue',
  ]);

  onMount(() => {
    window.HSStaticMethods.autoInit(['input-number']);

    const el = HSInputNumber.getInstance(
      `#input-number-${props.name}`,
    ) as HSInputNumber;

    el.on('change', ({ inputValue }: { inputValue: number }) => {
      props.onInputValue(inputValue);
    });

    props.onInputValue(props.value || 0);
  });

  return (
    <div>
      {props.label && (
        <label
          for={props.name}
          class="mb-2 block text-sm font-medium dark:text-white"
        >
          {props.label} {props.required && <span class="text-red-500">*</span>}
        </label>
      )}
      <div
        id={`input-number-${props.name}`}
        class="py-2 px-3 bg-white border rounded-lg dark:bg-neutral-900"
        classList={{
          'border-gray-200 dark:border-neutral-700': !props.error,
          'border-red-500': !!props.error,
        }}
        data-hs-input-number='{
          "step": 1000
        }'
      >
        <div class="w-full flex justify-between items-center gap-x-3">
          <div class="relative w-full">
            <input
              id={props.name}
              {...inputProps}
              class="w-full p-0 pe-7 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
              type="text"
              value={props.value || 0}
              data-hs-input-number-input
              aria-invalid={!!props.error}
              aria-errormessage={`${props.name}-error`}
            />
            <Show when={!!props.error}>
              <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                <InfoIcon class="flex-shrink-0 size-4 text-red-500" />
              </div>
            </Show>
          </div>

          <div class="flex justify-end items-center gap-x-1.5">
            <button
              type="button"
              class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              data-hs-input-number-decrement
            >
              <MinusIcon class="flex-shrink-0 size-3.5" />
            </button>
            <button
              type="button"
              class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              data-hs-input-number-increment
            >
              <PlusIcon class="flex-shrink-0 size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {props.error && (
        <p class="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
          {props.error}
        </p>
      )}
    </div>
  );
};
