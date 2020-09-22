import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Router>
        <App />
      </Router>
    </DndProvider>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
