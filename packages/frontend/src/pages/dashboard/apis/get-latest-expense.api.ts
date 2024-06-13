import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';

export default async () => {
  const { axios } = useContext(AxiosContext);

  return axios.get<
    {
      id: number;
      name: string;
      amount: string | null;
      budgetId: number;
      createdAt: string;
    }[]
  >(`/expense`);
};
