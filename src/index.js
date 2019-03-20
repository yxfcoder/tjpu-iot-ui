import React from 'react';
import ReactDOM from 'react-dom';
import MRoute from './routes/index';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MRoute />,
    document.getElementById('root')
);
registerServiceWorker();
