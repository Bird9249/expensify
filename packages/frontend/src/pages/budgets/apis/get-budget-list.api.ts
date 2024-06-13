import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';

export default async () => {
  const { axios } = useContext(AxiosContext);

  return axios.get<
    {
      total_spend: number;
      total_item: number;
      id: number;
      name: string;
      amount: string;
      icon: string;
      createdBy: string;
    }[]
  >('/budget');
};
