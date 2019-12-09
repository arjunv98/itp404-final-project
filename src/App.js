import React from "react";
import "./App.css";
import MyTripsPage from "./MyTripsPage";
import TripDetailsPage from "./TripDetailsPage";
import CityDetailsPage from "./CityDetailsPage";
import SearchPage from "./SearchPage";
import PageNotFound from "./PageNotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>Flight Planner</h1>
        <Nav variant="pills" className="justify-content-center">
          <Nav.Item>
            <Nav.Link href={`/`}>My Trips</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`/search`}>Search for Cities</Nav.Link>
          </Nav.Item>
        </Nav>
        <Switch>
          <Route path="/" exact={true} component={MyTripsPage} />
          <Route path="/trips/:id" component={TripDetailsPage} />
          <Route path="/cities/:id" component={CityDetailsPage} />
          <Route path="/search" exact={true} component={SearchPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
