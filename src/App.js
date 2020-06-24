import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './custom-style.css'

import store from './store/store';
import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
