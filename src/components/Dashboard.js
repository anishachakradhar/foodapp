import React, { Component } from 'react';
import { Icon, Card, Grid } from 'semantic-ui-react';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Grid>
          <Grid.Column width={3}>
            <Card>
              <Card.Content header="Total students" />
              <Card.Content description="The total number of students enrolled." />
              <Card.Content extra>
                <Icon name="user" />4 students
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Card.Content header="BCT" />
              <Card.Content description="The number of students enrolled in BCT." />
              <Card.Content extra>
                <Icon name="user" />4 students
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card>
              <Card.Content header="BCE" />
              <Card.Content description="The number of students enrolled in BCE." />
              <Card.Content extra>
                <Icon name="user" />4 students
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
