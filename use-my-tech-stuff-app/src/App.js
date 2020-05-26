import React from 'react';
import './App.css';
import Login from './componets/Login'
import Registration from './componets/Registration'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './componets/PrivateRoute'
import NavBar from './componets/NavBar'
import RentalsList from './componets/RentalsList'
import HomePage from './componets/HomePage'
import ListItemDetails from './componets/ListItemDetails'




function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <PrivateRoute exact path='/rentals' component={RentalsList} />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/rentals/:id' >
            <ListItemDetails />
          </Route>

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
