import { Link, Route } from "react-router-dom";
import Home from "./pages/Home"; // router component
import About from "./pages/About";
import Header from './components/Header'; // general component

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

            {/* React uses Link to switch between different components */}
            <Link className="list-group-item" to="/about">
              About
            </Link>
            <Link className="list-group-item" to="/home">
              Home
            </Link>
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
