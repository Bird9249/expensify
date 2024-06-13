import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';
import { BudgetSchemaType } from '../schemas/budget.schema';

export default async (form: BudgetSchemaType & { createdBy: string }) => {
  const { axios } = useContext(AxiosContext);

  return await axios.post<{ message: string }>('/budget', form);
};
