import { useContext } from 'solid-js';
import SignIn from '../../components/auth/SignIn';
import { ClerkContext } from '../../contexts/ClerkContext';

export default () => {
  const clerk = useContext(ClerkContext)!;

  return <SignIn clerk={clerk} />;
};
