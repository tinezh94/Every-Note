import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import * as notebookActions from "./store/notebooks"
import NotebookForm from "./components/NotebookForm";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupForm from "./components/SignupFormModal/SignupForm";
// import CreateNotebook from "./components/Homepage/CreateNotebook";
import Homepage from "./components/Homepage/Homepage";
import SplashPage from "./components/SplashPage/SplashPage";
// import EditNotebook from "./components/EditNotebookModal/EditNotebook";
import NotebookDetailPage from './components/NotebookDetailPage';
import NotesListingPage from "./components/NotesPage";
import AddNewNote from "./components/AddNewNote";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const allNotebooks = useSelector(state => state.notebooks);

  // Restore user
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
              {sessionUser ? <Redirect exact to='/home' /> : null }
          </Route>
          <Route exact path="/home">
              <Homepage />
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <Route exact path='/signup'>
            <SignupForm />
          </Route>
          <Route exact path="/notebooks">
            <NotebookForm  />
          </Route>
          <Route exact path="/notebooks/notebook/:id">
            <NotebookDetailPage allNotebooks={allNotebooks} sessionUser={sessionUser} />
          </Route>
          <Route exact path="/notes">
            <NotesListingPage />
          </Route>
          <Route>
            Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
