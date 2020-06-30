import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Item, Grid, List, Button, Label } from 'semantic-ui-react';

import { deleteFood } from '../reducers/addFoodReducer';

class FoodDetails extends Component {

  handleDelete = (index) => {
    this.props.actions.deleteFood(index);
    this.props.history.push('/list-food');
  }

  render() {
  console.log(this.props);

    return (
      <div className="container">
        {this.props.foods.length ?
          this.props.foods.map((selectedFood, index) => 
          parseInt(this.props.match.params.id) === index &&
            <div key={index}>
              <h2>{selectedFood.basics.name}</h2>
              <Button color='red' id="right-button" onClick={() => this.handleDelete(index)}>Delete</Button>
              <Button primary id="right-button">Edit</Button>
              <Item.Group>
                <Item>
                  <Item.Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/molly.png' rounded />
                  <Item.Content verticalAlign='middle'>
                    <Item.Description>
                      {selectedFood.basics.description}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group> 
              <Grid divided>
                <Grid.Column width={8}>
                  <div className="detail-page-grid">
                    <h4>Ingredients</h4>
                    <List>
                      {selectedFood.ingredients.length ?
                        selectedFood.ingredients.map((ingredient, index) => 
                          <List.Item id="list-item" key={index}>
                            <List.Icon name='chevron circle right' size='large' />
                            <List.Content id='ingre-steps-list'>{ingredient}</List.Content>
                          </List.Item> )
                        : <div id='ingre-steps-list'>No ingredients</div> }
                    </List>
                  </div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <div className="detail-page-grid">
                    <h4>Directions</h4>
                    <List>
                      {selectedFood.steps.length ? 
                        selectedFood.steps.map((step, index) => 
                          <List.Item id="list-item" key={index}>
                            <Grid>
                              <Grid.Column width={3}>
                                <Label pointing='right' id='main-color' size='large'>Step {index+1}</Label>
                              </Grid.Column>
                              <Grid.Column width={13}>
                                <List.Content id='ingre-steps-list'>{step}</List.Content>
                              </Grid.Column>
                            </Grid>
                          </List.Item> )
                        : <div id='ingre-steps-list'>No steps</div> }
                    </List>
                  </div>
                </Grid.Column>
              </Grid>
              <Button basic color='blue' as={ Link } to='/list-food'>Back</Button>
            </div>
        ) : 'No details' }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    foods: state.addFood.foods
  }
}

const mapActionToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      deleteFood
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(FoodDetails);
