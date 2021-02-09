import  React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import HackList from '../components/HackList'

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/hacklist" exact component={HackList} />
    </Switch>
  </Router>
);