import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Apps';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/App.css'
import './assets/css/Home_Page.css'
// import './assets/css/Home_page.css'
import reducers from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let _store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
  <Provider store = {_store}>
        <App/>
  </Provider>,
  document.getElementById('root')
);
