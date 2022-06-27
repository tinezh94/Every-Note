import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import * as notebookActions from "./store/noteboooks"
import NotebookForm from "./components/NotebookForm";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupForm from "./components/SignupFormModal/SignupForm";
import CreateNotebook from "./components/Homepage/CreateNotebook";
import Homepage from "./components/Homepage/Homepage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/home">
            {sessionUser ? <Redirect to='/home' /> : null}
              <Homepage />
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <Route exact path='/signup'>
            <SignupForm />
          </Route>
          <Route exact path="/notebooks">
            <NotebookForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
