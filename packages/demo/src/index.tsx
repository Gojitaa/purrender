/* @refresh reload */
import { render } from 'solid-js/web';
import { render as purrender } from 'renderer';

import './index.css';
import App from './App';

const root = document.getElementById('root');
const testRoot = document.getElementById('test-root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => <App />, root!);
purrender(() => <App /> as any, testRoot!);
