import { Link, NavLink, Route } from "react-router-dom";
import Home from "./pages/Home"; // router component
import About from "./pages/About";
import Header from './components/Header'; // general component
import MyNavLink from './components/MyNavLink';

function App() {
  return (
    <div>
      <Header />
      {/* <BrowserRouter> */}
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* original HTML uses <a> to jump to different pages */}
            {/* <a className="list-group-item" href="./about.html">
              About
            </a>
            <a className="list-group-item active" href="./home.html">
              Home
            </a> */}

            {/* React uses Link/NavLink to switch between different components */}
            {/* className changes to "list-group-item clicked" after being clicked */}
            {/* <NavLink activeClassName="clicked" className="list-group-item" to="/about">
              About
            </NavLink>
            <NavLink className="list-group-item" to="/home">
              Home
            </NavLink> */}

            {/* Encapsulate all NavLink to MyNavLink */}
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink to="/home">Home</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* React also registers Route to render component according to the current path */}
              <Route path="/about" component={About} />
              <Route path="/home" component={Home} />
            </div>
          </div>
        </div>
      </div>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
