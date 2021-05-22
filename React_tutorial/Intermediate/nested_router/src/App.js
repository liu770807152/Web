import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home"; // router component
import About from "./pages/About";
import Header from './components/Header'; // general component
import MyNavLink from './components/MyNavLink';

function App() {
  return (
    <>
      <Header />
      {/* <BrowserRouter> */}
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* Encapsulate all NavLink to MyNavLink */}
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink to="/home">Home</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* Route also matches the path with the registered path to render component */}
              {/* Use Switch to enhance matching efficiency */}
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/home" component={Home} />
                <Redirect to="/about"/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;

