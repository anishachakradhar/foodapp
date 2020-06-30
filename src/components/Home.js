import React, { Component } from 'react'
import Header from './Header'
import SideMenu from './SideMenu'
import { Grid } from 'semantic-ui-react'
import Dashboard from './Dashboard'
import { Switch, Route } from 'react-router-dom'
import AddFood from './AddFood'
import ListFood from './ListFood'
import FoodDetails from './FoodDetails'

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
              <Route path='/food-detail/:id' component={ FoodDetails } />
              <Route path='/add-food' component={ AddFood } />
              <Route path='/list-food' component={ ListFood } />
              <Route path='/' component={ Dashboard } />
            </Switch>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
