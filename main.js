import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/App.js';

const root = document.getElementById('app');

ReactDOM.render(<App pollInterval={2000}/>, root);

