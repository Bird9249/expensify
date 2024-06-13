import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';
import { ExpenseSchemaType } from '../schemas/expense.schema';

export default async (form: ExpenseSchemaType & { budget_id: number }) => {
  const { axios } = useContext(AxiosContext);

  return await axios.post<{ message: string }>('/expense', form);
};
