import { HashRouter, Route, Routes } from 'react-router-dom';

import Flow from './components/Flow';
import NotFound from './pages/NotFound';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>React Flow - Vite</header>
      <Routes>
        <Route path="/" element={<Flow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
