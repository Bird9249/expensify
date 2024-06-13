import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';
import { BudgetSchemaType } from '../schemas/budget.schema';

export default async (id: string, form: BudgetSchemaType) => {
  const { axios } = useContext(AxiosContext);

  return await axios.put<{ message: string }>(`/budget/${id}`, form);
};
