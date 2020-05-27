import React from 'react';
import './App.css';
import Login from './componets/Login'
import Registration from './componets/Registration'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './componets/PrivateRoute'
import NavBar from './componets/NavBar'
import RentalsList from './componets/RentalsList'
import HomePage from './componets/HomePage'
import UserProfile from './componets/UserProfile'
import ListItemDetails from './componets/ListItemDetails'
import RentYourTech from './componets/RentYourTech';





function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <PrivateRoute exact path='/rentals' component={RentalsList} />
          <Route exact path='/' component={HomePage} />
          <PrivateRoute exact path='/rentals/:id' component={ListItemDetails}/>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Registration />
          </Route>

          <Route path='/profile'>
            <UserProfile />
          </Route>

          <Route path='/rentyourtech'>
            <RentYourTech />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
