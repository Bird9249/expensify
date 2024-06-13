import { useContext } from 'solid-js';
import { AxiosContext } from '../../../contexts/AxiosContext';

export default async (id: string) => {
  const { axios } = useContext(AxiosContext);

  return await axios.delete<{ message: string }>(`/expense/${id}`);
};
