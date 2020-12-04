import { Redirect, Route, Switch } from "react-router-dom";
import AddNote from "./pages/AddNote";
import NavBar from "./components/NavBar/navBar";
import NotePage from "./pages/notePage";
import PrivateRoute, {PrivateRouteIfLogged} from "./components/PrivateRoute";
import AuthProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import NotesList from "./pages/NotesList";
import PageNotFound from "./pages/PageNotFound";
import SignupPage from "./pages/signupPage";

function App() {
  return (
    <>
              <AuthProvider>
      <div className="App">
        <NavBar />
        <main>
          <Switch>
              <PrivateRouteIfLogged
                path="/signup"
                component={SignupPage}
              />
              <PrivateRouteIfLogged
                path="/login"
                component={LoginPage}
              />
              <PrivateRoute
                exact
                path="/notelist/:id"
                component={NotePage} 
                />

              <PrivateRoute
                exact
                path="/notelist"
                component={NotesList}
              />

              <PrivateRoute
                path="/addnote"
                component={AddNote}
              />
       
            
              <PrivateRouteIfLogged
                exact
                path="/"
                component={LoginPage}
              />
          <Route exact to="/pagenotfound" component={PageNotFound} />

              <Redirect from="*" to="/pagenotfound" />
          </Switch>
        </main>
      </div>
            </AuthProvider>
    </>
  );
}

export default App;
