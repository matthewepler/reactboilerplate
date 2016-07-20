import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

const root = document.getElementById('app');

ReactDOM.render(<App  dataURL="http://localhost:3000/leads" pollInterval={2000}/>, root);

