// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div className="persistent-background">
      <div className=' fixed overflow-auto inset-0'>
        <BrowserRouter>
          {/* <NxWelcome title="frontend" /> */}
          <p>Testing...</p>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
