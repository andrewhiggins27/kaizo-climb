import  React from "react"
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import HackList from '../components/HackList'
import HackShow from '../components/HackShow'

export default (
  <BrowserRouter>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/hacklist/:id" exact component={HackList} />
        <Route path="/hack/:id" exact component={HackShow} />
      </Switch>
    </Router>
  </BrowserRouter>
);