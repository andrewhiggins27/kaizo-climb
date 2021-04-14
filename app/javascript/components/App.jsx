import React, { Component } from "react";

import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Home from "../components/Home";
import HackList from "../components/HackList";
import HackShow from "../components/HackShow";
import NavBar from "../components/NavBar";
import LogIn from "../components/LogIn";
import Registration from "../components/auth/Registration";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    fetch("/logged_in", {
      credentials: "include",
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: body.user
          })
        } else if (!body.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Router>
            <NavBar
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout}
              user={this.state.user}
            />
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Home {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route path="/hacklist/:id" exact component={HackList} />
              <Route path="/hack/:id" exact component={HackShow} />
              <Route
                path="/login"
                exact
                render={(props) => (
                  <LogIn {...props} handleLogin={this.handleLogin} />
                )}
              />
              <Route
                path="/signup"
                exact
                render={(props) => (
                  <Registration
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    handleLogin={this.handleLogin}
                  />
                )}
              />
            </Switch>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
