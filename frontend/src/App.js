import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom"
// import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session"
import Navigation from './components/Navigation/index'
import AllSpots from "./components/spots";
import SpotDetails from "./components/spots/SpotDetails"
import UserBookings from "./components/bookings/UserBookings";
import CreateSpot from "./components/spots/CreateSpot";
import ManageSpots from "./components/spots/ManageSpots";
import EditSpot from "./components/spots/EditSpot";
function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.getSessionThunk()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <AllSpots />
            </Route>
            <Route path="/spots/new">
              <CreateSpot />
            </Route>
            <Route path="/spots/current">
              <ManageSpots />
            </Route>
            <Route exact path="/spots/:spotId">
              <SpotDetails />
            </Route>
            <Route path='/spots/:spotId/edit'>
              <EditSpot />
            </Route>
            <Route path='/bookings/current'>
              <UserBookings />
            </Route>


          </Switch>
        )}
      </>
    </>
  );
}

export default App;
