import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {configureMobileStatusBar} from './utils/mobileStatusBar.ts';

void configureMobileStatusBar();

createRoot(document.getElementById('root')!).render(<App />);
