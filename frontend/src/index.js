import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './modules/app/components/root';
import './index.css';
import { SWRConfig } from 'swr';
import { swrConfig } from './lib/comms_v2/swrConfig';

const container = document.getElementById('root');
const root = createRoot(container);

const render = (Component) =>
  root.render(
    <SWRConfig value={swrConfig}>
      <Component />
    </SWRConfig>
  );

render(Root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
