import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import "./prebuild/scss/index.scss";

createRoot(document.getElementById('app')).render(<App />);
