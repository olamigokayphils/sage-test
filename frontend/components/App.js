import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Home from "./pages/Home";
import Login from "./pages/Login";

import "../styles/main.css";


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />

            </Switch>
        </Fragment>
      </Router>
      </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
