import React from 'react';
import ReactDOM from 'react-dom';
import { useConfig } from 'camelot-unchained/lib/graphql/react';

import App from './App';
//import '../src/env.js';

useConfig({
    url: 'https://hatcheryapi.camelotunchained.com/graphql'
})


ReactDOM.render(<App />, document.getElementById('root'));
