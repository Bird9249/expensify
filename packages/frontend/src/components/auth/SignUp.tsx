import { Clerk } from '@clerk/clerk-js';
import { onMount, ParentProps } from 'solid-js';

export default (props: ParentProps<{ clerk: Clerk }>) => {
  onMount(() => {
    const signInDiv = document.getElementById('sign-up') as HTMLDivElement;

    props.clerk.mountSignUp(signInDiv, {
      signInUrl: 'http://localhost:3001/',
      appearance: {
        variables: {
          colorPrimary: '#32b550',
        },
      },
    });
  });

  return (
    <div class="flex h-screen items-center justify-center">
      <div id="sign-up"></div>
    </div>
  );
};
