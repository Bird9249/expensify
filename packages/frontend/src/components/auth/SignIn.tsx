import { Clerk } from '@clerk/clerk-js';
import { onMount, ParentProps } from 'solid-js';

export default (props: ParentProps<{ clerk: Clerk }>) => {
  onMount(() => {
    const signInDiv = document.getElementById('sign-in') as HTMLDivElement;

    props.clerk.mountSignIn(signInDiv, {
      signUpUrl: 'http://localhost:3001/register',
      appearance: {
        variables: {
          colorPrimary: '#32b550',
        },
      },
    });
  });

  return (
    <div class="flex h-screen items-center justify-center">
      <div id="sign-in"></div>
    </div>
  );
};
