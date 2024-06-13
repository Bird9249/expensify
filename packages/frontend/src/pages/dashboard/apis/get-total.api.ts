import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';

export default async () => {
  const { axios } = useContext(AxiosContext);

  return axios.get<{
    total_budget_amount: string;
    total_budgets: number;
    total_spend: string;
  }>('/dashboard/total');
};
