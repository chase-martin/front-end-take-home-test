import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTemplate from "./components/AddTemplate";
import Template from "./components/Template";
import TemplatesList from "./components/TemplatesList";
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <Router>
      <GlobalProvider>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/templates" className="navbar-brand">
            Front-End Engineer Test
          </a>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/templates"]} component={TemplatesList} />
            <Route exact path="/add" component={AddTemplate} />
            <Route path="/template/:id" component={Template} />
          </Switch>
        </div>
      </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
