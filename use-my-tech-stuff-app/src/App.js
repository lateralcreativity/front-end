import React from 'react';
import './App.css';
import Login from './componets/Login'
import Registration from './componets/Registration'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path='/login'>
            <Login />
        </Route>

        <Route path='/register'>
          <Registration />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
