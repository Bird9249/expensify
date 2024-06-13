import { Picker } from 'emoji-picker-element';
import { createEffect, createSignal, on, ParentProps, Show } from 'solid-js';
import { Transition } from 'solid-transition-group';
import InfoIcon from '../icons/InfoIcon';

type EmojiPickerProps = {
  value: string | undefined;
  name: string;
  label?: string;
  error: string;
  required?: boolean;
  onSelect: (input: string) => void;
};

export default (props: ParentProps<EmojiPickerProps>) => {
  const [open, setOpen] = createSignal<boolean>(false);
  const [emojiEl, setEmojiEl] = createSignal<HTMLDivElement>();
  const [value, setValue] = createSignal<string>(props.value || '');

  createEffect(
    on(emojiEl, (input) => {
      if (input) {
        const emojiPicker = input.appendChild(new Picker());

        emojiPicker?.classList.add('light');
        emojiPicker?.addEventListener('emoji-click', (e) => {
          setValue(e.detail.unicode!);
          setOpen(false);
        });
      }
    }),
  );

  createEffect(
    on(value, (input) => {
      props.onSelect(input);
    }),
  );

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
      <div class="relative" id={`dropdown-container-${props.name}`}>
        <button
          type="button"
          class=" p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
          classList={{
            'border-red-500': !!props.error,
          }}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {value()}
        </button>

        <Transition name="slide-fade-up-down">
          <Show when={open()}>
            <div
              onFocus={(e) => {
                console.log(e);
              }}
              class="z-10 fixed overflow-hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
              ref={setEmojiEl}
            ></div>
          </Show>
        </Transition>

        <Show when={!!props.error}>
          <div class="pointer-events-none absolute inset-y-0 start-16 flex items-center pe-3">
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
