import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom"
// import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session"
import Navigation from './components/Navigation/index'
import AllSpots from "./components/spots";

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

          </Switch>
        )}
      </>
    </>
  );
}

export default App;
