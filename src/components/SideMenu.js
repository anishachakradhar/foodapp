import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: ''
    }
  }
  handleItemClick = (e, { icon }) => {
    this.setState({ 
      activeItem: icon 
    })
  }

  render() {
    return (
      <div>
        <div className="full-side-menu">
          <Menu vertical id="side-menu">
            <Menu.Item
              id="side-menu-item"
              icon='grid layout'
              name='dashboard'
              active={this.state.activeItem === 'dashboard'}
              onClick={this.handleItemClick}
              as={ Link }
              to="/"
            />
            <Menu.Item
              id="side-menu-item"
              icon='food'
              name='add food'
              active={this.state.activeItem === 'add food'}
              onClick={this.handleItemClick}
              as={ Link }
              to="/add-food"
            />
            <Menu.Item
              id="side-menu-item"
              icon='list'
              name='list food'
              active={this.state.activeItem === 'list food'}
              onClick={this.handleItemClick}
              as={ Link }
              to="/list-food"
            />
          </Menu>
        </div>
        <div className="icon-side-menu">
        <Menu vertical id="side-menu">
          <Menu.Item
            id="side-menu-item"
            icon='grid layout'
            active={this.state.activeItem === 'grid layout'}
            onClick={this.handleItemClick}
            as={ Link }
            to="/"
          />
          <Menu.Item
            id="side-menu-item"
            icon='food'
            active={this.state.activeItem === 'food'}
            onClick={this.handleItemClick}
            as={ Link }
            to="/add-food"
          />
          <Menu.Item
            id="side-menu-item"
            icon='list'
            active={this.state.activeItem === 'list'}
            onClick={this.handleItemClick}
            as={ Link }
            to="/list-food"
          />
        </Menu>
      </div>
    </div>
    )
  }
}
