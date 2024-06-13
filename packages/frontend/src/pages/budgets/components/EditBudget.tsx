import {
  createForm,
  FormError,
  setValue,
  SubmitHandler,
  valiForm,
} from '@modular-forms/solid';
import HSOverlay from '@preline/overlay';
import { useParams } from '@solidjs/router';
import { ICollectionItem } from 'preline';
import {
  createEffect,
  createSignal,
  on,
  ParentProps,
  Show,
  useContext,
} from 'solid-js';
import EmojiPicker from '../../../components/form/EmojiPicker';
import NumberInput from '../../../components/form/NumberInput';
import TextInput from '../../../components/form/TextInput';
import PencilIcon from '../../../components/icons/PencilIcon';
import XIcon from '../../../components/icons/XIcon';
import { AxiosContext } from '../../../contexts/AxiosContext';
import { ToastsContext } from '../../../contexts/ToastsContext';
import updateBudgetApi from '../apis/update-budget.api';
import { BudgetSchema, BudgetSchemaType } from '../schemas/budget.schema';

type Props = ParentProps<{
  onSuccess: () => void;
  icon: string;
  name: string;
  amount: number;
}>;

export default ({ onSuccess, ...props }: Props) => {
  const {
    error: [error],
  } = useContext(AxiosContext);
  const toasts = useContext(ToastsContext);

  const params = useParams();

  const [ele, setEle] = createSignal<HTMLDivElement>();
  const [modal, setModal] = createSignal<HSOverlay>();

  createEffect(
    on(ele, (input) => {
      if (input) {
        window.HSStaticMethods.autoInit(['overlay']);

        const { element } = HSOverlay.getInstance(
          input,
          true,
        ) as ICollectionItem<HSOverlay>;
        setModal(element);
      }
    }),
  );

  const [form, { Form, Field }] = createForm<BudgetSchemaType>({
    validate: valiForm(BudgetSchema),
    initialValues: props,
  });

  const handleSubmit: SubmitHandler<BudgetSchemaType> = async (values) => {
    const res = await updateBudgetApi(params.id, values);
    await modal()?.close();
    onSuccess();
    toasts?.show(res.data.message);
  };

  createEffect(
    on(error, (err) => {
      if (err) {
        const {
          errors: { nested },
        } = err;

        if (nested) {
          throw new FormError<BudgetSchemaType>({
            icon: nested.icon ? nested.icon[0] : undefined,
            amount: nested.amount ? nested.amount[0] : undefined,
            name: nested.name ? nested.name[0] : undefined,
          });
        }
      }
    }),
  );

  return (
    <>
      <button
        data-hs-overlay="#hs-edit-budget-modal"
        type="button"
        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
      >
        <PencilIcon class="flex-shrink-0 size-4" />
        Edit
      </button>

      <div
        ref={setEle}
        id="hs-edit-budget-modal"
        class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <Form
            onSubmit={handleSubmit}
            class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
          >
            <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 class="font-bold text-gray-800 dark:text-white">
                Update budget
              </h3>
              <button
                type="button"
                class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                data-hs-overlay="#hs-edit-budget-modal"
              >
                <span class="sr-only">Close</span>
                <XIcon class="flex-shrink-0 size-4" />
              </button>
            </div>

            <div class="flex flex-col gap-y-4 p-4 overflow-y-auto">
              <Field name="icon">
                {(field, props) => (
                  <EmojiPicker
                    onSelect={(input) => {
                      setValue(form, 'icon', input);
                    }}
                    name={props.name}
                    required
                    error={field.error}
                    value={field.value}
                  />
                )}
              </Field>
              <Field name="name">
                {(field, props) => (
                  <TextInput
                    label="Budget name"
                    {...props}
                    type="text"
                    placeholder="e.g. Home Decor"
                    required
                    error={field.error}
                    value={field.value}
                  />
                )}
              </Field>
              <Field name="amount" type="number">
                {(field, props) => (
                  <NumberInput
                    label="Budget amount"
                    onInputValue={(e) => {
                      setValue(form, 'amount', e ? e : 0);
                    }}
                    name={props.name}
                    ref={props.ref}
                    required
                    error={field.error}
                    value={field.value}
                  />
                )}
              </Field>
            </div>
            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
              <button
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                data-hs-overlay="#hs-edit-budget-modal"
              >
                Close
              </button>
              <button
                type={form.submitting ? 'button' : 'submit'}
                class="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-white disabled:pointer-events-none disabled:opacity-50"
              >
                <Show when={form.submitting} fallback={'Update budget'}>
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
          </Form>
        </div>
      </div>
    </>
  );
};
