import { Clerk } from '@clerk/clerk-js';
import { useLocation, useNavigate } from '@solidjs/router';
import { createContext, ParentProps } from 'solid-js';

export const ClerkContext = createContext<Clerk | undefined>();

export const ClerkProvider = (props: ParentProps<{ clerk: Clerk }>) => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  if (!props.clerk.user && pathname !== '/login' && pathname !== '/register') {
    nav('/login');
  }

  return (
    <ClerkContext.Provider value={props.clerk}>
      {props.children}
    </ClerkContext.Provider>
  );
};
