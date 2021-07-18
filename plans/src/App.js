import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContext } from "./context/AuthContext";
import Create from "./pages/create";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Register from "./pages/Register";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              {user ? <Home /> : <Login />}
            </Route>
            <Route path="/projects/:userId">
              <Project />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Router path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Router>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
