import { useNavigate } from '@solidjs/router';
import axios, { AxiosError, AxiosStatic } from 'axios';
import {
  createContext,
  createSignal,
  ParentProps,
  Signal,
  useContext,
} from 'solid-js';
import { FlatErrors } from 'valibot';
import { ClerkContext } from './ClerkContext';

type ErrorState = { message: string; errors: FlatErrors<any> } | undefined;

type AxiosContextValue = {
  axios: AxiosStatic;
  error: Signal<ErrorState>;
};

export const AxiosContext = createContext<AxiosContextValue>({
  axios,
  error: createSignal<ErrorState>(),
});

export const AxiosProvider = (props: ParentProps) => {
  const clerk = useContext(ClerkContext);
  const navigator = useNavigate();
  const [error, setError] = createSignal<ErrorState>();

  axios.defaults.baseURL = process.env.PUBLIC_BASE_SERVICE_URL;

  const axiosError = (err: AxiosError<FlatErrors<any>>) => {
    if (err.response) {
      if (err.response.status === 400) {
        setError({
          message: err.message!,
          errors: err.response.data,
        });
      }

      if (err.response.status === 401) {
        navigator('/login');
      }

      if (err.response.status >= 500) {
        // setError({
        //   message: err.response?.data.message!,
        //   errors: err.response?.data.errors,
        // });
        // show alert message
      }
    }
  };

  axios.interceptors.request.use(async (res) => {
    const token = await clerk?.session?.getToken();

    const auth = token ? `Bearer ${token}` : '';

    res.headers.Authorization = auth;

    return res;
  });

  axios.interceptors.response.use((res) => res, axiosError);

  // createEffect(
  //   on(error, (err) => {
  //     if (err) {
  //       setTimeout(() => {
  //         setError(undefined);
  //       }, 5000);
  //     } else {
  //       axios.interceptors.response.use((res) => res, axiosError);
  //     }
  //   }),
  // );

  return (
    <AxiosContext.Provider value={{ axios, error: [error, setError] }}>
      {props.children}
    </AxiosContext.Provider>
  );
};
