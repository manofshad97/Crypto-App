import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './app/store'
import 'antd/dist/antd.css'
// require('dotenv').config()

ReactDOM.render(
  // Wrap Provider around the main App component so that the store that is imported from store.js can be used by all components within App.
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
)
