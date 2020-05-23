import React from 'react';
import './App.css';
import Login from './componets/Login'
import Registration from './componets/Registration'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function registrationHandler(event) {
  event.preventDefault();
}

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path='/login'>
            <Login />
        </Route>

        <Route path='/register'>
          <Registration 
          registrationHandler={registrationHandler}
          />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
