import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

const root = document.getElementById('app');

ReactDOM.render(<App pollInterval={2000}/>, root);

