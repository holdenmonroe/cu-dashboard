import React from 'react';
import ReactDOM from 'react-dom';
import { useConfig } from 'camelot-unchained/lib/graphql/react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

useConfig({
    url: 'https://hatcheryapi.camelotunchained.com'
})


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
