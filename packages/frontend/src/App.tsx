import { Clerk } from '@clerk/clerk-js';
import { RouteSectionProps, useLocation } from '@solidjs/router';
import { IStaticMethods } from 'preline/preline';
import { createEffect, createSignal } from 'solid-js';
import './App.css';
import { AxiosProvider } from './contexts/AxiosContext';
import { ClerkProvider } from './contexts/ClerkContext';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const clerk = new Clerk(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY!);
await clerk.load();

const App = (props: RouteSectionProps) => {
  const location = useLocation();
  const [_, setLoc] = createSignal(location.pathname);

  createEffect(() => {
    setLoc(location.pathname);

    window.HSStaticMethods.autoInit();
  });

  return (
    <ClerkProvider clerk={clerk}>
      <AxiosProvider>{props.children}</AxiosProvider>
    </ClerkProvider>
  );
};

export default App;
