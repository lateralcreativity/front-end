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
          <PrivateRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/rentals/:id' component={ListItemDetails}/>
          <PrivateRoute exact path='/profile/:id' component={UserProfile}/>
          <PrivateRoute path='/myprofile/' component={UserProfile}/>
          <PrivateRoute path='/rentyourtech' component={RentYourTech}/>           

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
