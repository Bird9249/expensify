import { Router } from '@solidjs/router';
import 'preline/preline';
import { render } from 'solid-js/web';
import routes from './routes';

const root = document.getElementById('root');
if (root) {
  render(() => <Router>{routes}</Router>, root);
}
