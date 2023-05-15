import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import { swrConfig } from './lib/comms_v2/swrConfig';
import Root from './modules/app/components/root';

const container = document.getElementById('root');
const root = createRoot(container);

const render = (Component) =>
  root.render(
    <SWRConfig value={swrConfig}>
      <Component />
    </SWRConfig>
  );

render(Root);
