import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { Button, Item, Divider } from 'semantic-ui-react';

import { deleteFood } from '../reducers/addFoodReducer';

class ListFood extends Component {
  render() {
    return (
      <div className="container">
        {this.props.foods.length ? (
          <Item.Group>
            {this.props.foods.map((food, index) => (
              <Item key={index}>
                <Item.Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                  rounded
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="a">{food.food.name}</Item.Header>
                  {/* <Item.Meta>Description</Item.Meta> */}
                  <Item.Description>{food.food.description}</Item.Description>
                  <Item.Extra>
                    <Button.Group>
                      <Button
                        color="teal"
                        as={Link}
                        to={`/food-detail/${food.id}`}
                      >
                        View
                      </Button>
                      <Button
                        color="blue"
                        as={Link}
                        to={`/edit-food/${food.id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        onClick={() => this.props.actions.deleteFood(food.id)}
                      >
                        Delete
                      </Button>
                    </Button.Group>
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
            <Divider />
          </Item.Group>
        ) : (
          'No food added'
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    foods: state.addFood.foods,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        deleteFood,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapActionToProps)(ListFood);
