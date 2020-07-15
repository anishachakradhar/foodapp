import React, { Component } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { Grid } from 'semantic-ui-react';
import Dashboard from './Dashboard';
import { Switch, Route } from 'react-router-dom';
import AddFood from './AddFood';
import ListFood from './ListFood';
import FoodDetails from './FoodDetails';

const PageNotFound = () => (
  <div className="page-not-found">
    <b>Page not found</b>
  </div>
);

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Grid.Column width={2} id="side-menu-show">
            <SideMenu />
          </Grid.Column>
          <Grid.Column width={14} id="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/add-food" component={AddFood} />
              <Route exact path="/list-food" component={ListFood} />
              <Route exact path="/food-detail/:id" component={FoodDetails} />
              <Route exact path="/edit-food/:id" component={AddFood} />
              <Route component={PageNotFound} />
            </Switch>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
