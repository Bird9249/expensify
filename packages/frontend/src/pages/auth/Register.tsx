import { useContext } from 'solid-js';
import SignUp from '../../components/auth/SignUp';
import { ClerkContext } from '../../contexts/ClerkContext';

export default () => {
  const clerk = useContext(ClerkContext)!;

  return <SignUp clerk={clerk} />;
};
