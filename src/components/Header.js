import React, { Component } from 'react';

import { Segment, Icon } from 'semantic-ui-react';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Segment id="navbar">
          <span className="navbar-title">
            Food Store
          </span>
          <span className="bar-icon">
            <Icon name='bars' />
          </span>
          <span className="navbar-menu">
          </span>
        </Segment>
      </div>
    )
  }
}
