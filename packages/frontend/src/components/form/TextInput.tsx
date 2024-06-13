import { JSX, ParentProps, Show, splitProps } from 'solid-js';
import InfoIcon from '../icons/InfoIcon';

type TextInputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date' | string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export default (props: ParentProps<TextInputProps>) => {
  const [, inputProps] = splitProps(props, ['value', 'label', 'error']);

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
      <div class="relative">
        <input
          class="block w-full rounded-lg px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500"
          classList={{
            'focus:border-primary-500 focus:ring-primary-500 border-gray-200 dark:focus:ring-neutral-600':
              !props.error,
            'focus:border-red-500 focus:ring-red-500 border-red-500':
              !!props.error,
          }}
          {...inputProps}
          id={props.name}
          value={props.value || ''}
          aria-invalid={!!props.error}
          aria-errormessage={`${props.name}-error`}
        />
        <Show when={!!props.error}>
          <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
            <InfoIcon class="size-4 flex-shrink-0 text-red-500" />
          </div>
        </Show>
      </div>

      {props.error && (
        <p class="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
          {props.error}
        </p>
      )}
    </div>
  );
};
