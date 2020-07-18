import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  Form,
  Divider,
  Grid,
  Input,
  TextArea,
  Icon,
  Label,
  Button,
  Header,
} from 'semantic-ui-react';

import { addFood, editFood } from '../reducers/addFoodReducer';

const initialFood = {
  id: '',
  ingredients: [''],
  steps: [''],
  food: {
    name: '',
    description: '',
    image: '',
  },
  errors: {},
};

const globalErrors = {
  name: 'Name field is empty.',
  description: 'Description field is empty.',
};

class AddFood extends Component {
  constructor(props) {
    super(props);
    this.updateIndex = props.match.params.id;
    this.state = this.getFood(this.updateIndex) ?? cloneDeep(initialFood);
  }

  getFood = (updateIndex) =>
    this.props.foods.find((food) => food.id === updateIndex);

  componentDidUpdate = (oldProps) => {
    if (!this.props.match.params.id && oldProps.match.params.id) {
      this.setState(initialFood);
    }
  };

  handleChange = (e) => {
    this.setState({
      food: {
        ...this.state.food,
        [e.target.name]: e.target.value,
      },
    });
  };

  addIngredientField = () => {
    this.setState({
      ingredients: [...this.state.ingredients, ''],
    });
  };

  removeIngredientField = (index) => {
    const { ingredients } = this.state;
    ingredients.splice(index, 1);
    this.setState({
      ingredients,
    });
  };

  handleAddIngredient = (e, index) => {
    const { ingredients } = this.state;
    ingredients[index] = e.target.value;
    this.setState({
      ingredients,
    });
  };

  addStepField = () => {
    this.setState({
      steps: [...this.state.steps, ''],
    });
  };

  removeStepField = (index) => {
    const { steps } = this.state;
    steps.splice(index, 1);
    this.setState({
      steps,
    });
  };

  handleAddStep = (e, index) => {
    const { steps } = this.state;
    steps[index] = e.target.value;
    this.setState({
      steps,
    });
  };

  handleSubmit = () => {
    if (this.handleValidation()) {
      let errors = {};
      if (this.updateIndex) {
        this.props.actions.editFood(this.state, errors);
        this.props.history.push(`/food-detail/${this.state.id}`);
      } else {
        const id = Math.random().toString(36).substr(2, 7);
        this.props.actions.addFood({ ...this.state, id, errors });
      }
      this.setState(cloneDeep(initialFood));
    }
  };

  handleValidation = () => {
    let fields = this.state;
    let errors = {};
    let isValid = true;

    if (fields['ingredients'].includes('') || !fields['ingredients'].length) {
      errors['ingredients'] = 'Ingredients field is empty.';
      isValid = false;
    }

    if (fields['steps'].includes('') || !fields['ingredients'].length) {
      errors['steps'] = 'Directions field is empty.';
      isValid = false;
    }

    for (let field in fields['food']) {
      if (!fields['food'][field] && field !== 'image') {
        errors[field] = globalErrors[field];
        isValid = false;
      }
    }

    this.setState({ errors });
    return isValid;
  };

  render() {
    return (
      <div className="container">
        <h3>Add Food</h3>
        <Divider />
        <Form id="form">
          {Object.keys(this.state.errors).length !== 0 && (
            <div className="ui form error custom-error">
              <div className="ui error message">
                <ul className="list">
                  {Object.keys(this.state.errors).map((key, index) => (
                    <li key={index}>{Object.values(this.state.errors[key])}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <Grid divided>
            <Grid.Column width={8}>
              <h3>Basics</h3>
              <Divider />
              <Form.Input
                name="name"
                value={this.state.food.name}
                label="Name"
                placeholder="Enter food name"
                width={14}
                onChange={this.handleChange}
                className="required"
              />
              <Form.Input label="Description" width={14} className="required">
                <TextArea
                  name="description"
                  value={this.state.food.description}
                  placeholder="Enter your food description"
                  onChange={this.handleChange}
                />
              </Form.Input>
              <Form.Input
                name="image"
                type="file"
                id="image-button"
                value={this.state.food.image}
                label="Food Image"
                width={14}
                onChange={this.handleChange}
              />
              <h3>Recipe</h3>
              <Divider />
              <Form.Field>
                <Grid>
                  <Grid.Column width={3}>
                    <Header as="h5" className="required">
                      Ingredients
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    {this.state.ingredients.map((field, index) => {
                      return (
                        <Grid key={index}>
                          <Grid.Column width={14}>
                            <Input
                              label={index + 1}
                              name="ingredients"
                              placeholder="Enter your ingredient"
                              value={field}
                              onChange={(e) =>
                                this.handleAddIngredient(e, index)
                              }
                            />
                          </Grid.Column>
                          {index !== 0 && (
                            <Grid.Column width={2}>
                              <Icon
                                name="minus circle"
                                size="large"
                                style={{ padding: '10px' }}
                                onClick={(e) =>
                                  this.removeIngredientField(index)
                                }
                              />
                            </Grid.Column>
                          )}
                        </Grid>
                      );
                    })}
                    <Grid>
                      <Grid.Column width={14}>
                        <Button
                          floated="right"
                          fluid
                          onClick={this.addIngredientField}
                        >
                          <Icon name="plus" />
                          Add Ingredient
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <h3>Directions</h3>
              <Divider />
              <Form.Field>
                <Grid>
                  <Grid.Column width={3}>
                    <Header as="h5" className="required">
                      Steps
                    </Header>
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column>
                    {this.state.steps.map((field, index) => {
                      return (
                        <Grid key={index}>
                          <Grid.Column width={3}>
                            <Label pointing="right" size="large">
                              Step {index + 1}
                            </Label>
                          </Grid.Column>
                          <Grid.Column width={11}>
                            <TextArea
                              name="ingredients"
                              placeholder="Enter your description"
                              value={field}
                              onChange={(e) => this.handleAddStep(e, index)}
                            />
                          </Grid.Column>
                          {index !== 0 && (
                            <Grid.Column width={2}>
                              <Icon
                                name="minus circle"
                                size="large"
                                style={{ padding: '10px' }}
                                onClick={(e) => this.removeStepField(index)}
                              />
                            </Grid.Column>
                          )}
                        </Grid>
                      );
                    })}
                    <Grid>
                      <Grid.Column width={16}>
                        <Button
                          floated="right"
                          fluid
                          onClick={this.addStepField}
                        >
                          <Icon name="plus" />
                          Add Steps
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </Form.Field>
            </Grid.Column>
          </Grid>
          <div id="submit">
            <Button id="submit-button" onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
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
        addFood,
        editFood,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapActionToProps)(AddFood);
