import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import * as notebookActions from "./store/notebooks"
import NotebookForm from "./components/NotebookForm";
import LoginFormPage from "./components/LoginFormModal/LoginFormPage";
import SignupFormPage from "./components/SignupFormModal/SignupFormPage";
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

  const history = useHistory();

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded}/>
            <SplashPage />
            {sessionUser ? <Redirect exact to='/home' /> : history.push('/') }
          </Route>
          <Route exact path="/home">
              <Homepage />
          </Route>
          <Route exact path='/login'>
            <LoginFormPage />
          </Route>
          <Route exact path='/signup'>
            <SignupFormPage />
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
