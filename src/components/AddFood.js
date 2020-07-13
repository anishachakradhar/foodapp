import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Divider, Grid, Input, TextArea, Icon, Label, Button, Header } from 'semantic-ui-react';

import { addFood, editFood } from '../reducers/addFoodReducer';

class AddFood extends Component {
  constructor(props) {
    super(props);
    
    const updateIndex = props.match.params.id || null
    const food = updateIndex ? this.getFood(updateIndex) : {}

    this.state = {
      updateIndex,
      id                : food.id || '',
      ingredients       : food.ingredients || [],
      steps             : food.steps || [],
      food: {
        name            : food.basics?.name || '',
        description     : food.basics?.description || '',
        image           : food.basics?.image || '',
        firstIngredient : food.basics?.firstIngredient || '',
      }
    }
  }

  getFood = (updateIndex) => {
    for (let i = 0; i < this.props.foods.length; i+=1) {
      if (this.props.foods[i].id === updateIndex)
        return this.props.foods[i]
    }
  }

  componentDidUpdate = (oldProps) => {
    if (oldProps.match.params.id === this.state.updateIndex && !this.props.match.params.id) {
      this.setState({
        updateIndex: null,
        id: '',
        ingredients: [],
        steps: [],
        food: {
          name: '',
          description: '',
          image: '',
          firstIngredient: ''
        }
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      food: {
        ...this.state.food,
        [e.target.name]: e.target.value
      }
    })
  }

  addIngredientField = () => {
    this.setState({
      ingredients: [...this.state.ingredients, '']
    })
  }

  removeIngredientField  = (index) => {
    const { ingredients } = this.state
    ingredients.splice(index, 1);

    this.setState({
      ingredients
    })
  }

  handleAddIngredient = (e, index) => {
    const { ingredients } = this.state
    ingredients[index] = e.target.value
    this.setState({
      ingredients
    })
  }

  addStepField = () => {
    this.setState({
      steps: [...this.state.steps, '']
    })
  }

  removeStepField  = (index) => {
    const { steps } = this.state
    steps.splice(index, 1);

    this.setState({
      steps
    })
  }

  handleAddStep = (e, index) => {
    const { steps } = this.state
    steps[index] = e.target.value
    this.setState({
      steps
    })
  }

  handleSubmit = () => {
    const { id }    = this.state
    const { food }  = this.state
    const { steps } = this.state

    let ingredients;
    if (this.state.food.firstIngredient) 
      ingredients = [this.state.food.firstIngredient, ...this.state.ingredients]
    else 
      ingredients = this.state.ingredients
    
    if (this.state.updateIndex) {
      this.props.actions.editFood(id, food, ingredients, steps)
      this.props.history.push(`/food-detail/${id}`)
    } else {
      const id = Math.random().toString(36).substr(2, 7)
      this.props.actions.addFood(id, food, ingredients, steps)
    }

    this.setState({
      updateIndex: null,
      id: '',
      food: {
        name: '',
        description: '',
        image: '',
        firstIngredient: ''
      },
      ingredients: [],
      steps: []
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Add Food</h3>
        <Divider />
        <Form id="form">
          <Grid divided>
            <Grid.Column width={8}>
              <h3>Basics</h3>
              <Divider />
              <Form.Input name='name' value={this.state.food.name} label='Name' placeholder='Enter food name' width={14} onChange={this.handleChange} />
              <Form.Input label='Description' width={14}>
                <TextArea name='description' value={this.state.food.description} placeholder='Enter your food description' onChange={this.handleChange} />
              </Form.Input>
              <Form.Input name='image' type='file' id="image-button" value={this.state.food.image} label='Food Image' width={14} onChange={this.handleChange} />
              <h3>Recipe</h3>
              <Divider />
              <Form.Field>
                <Grid>
                  <Grid.Column width={3}>
                    <Header as='h5'>Add Ingredients</Header>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Grid>
                      <Grid.Column width={14}>
                        <Input label='1' name='firstIngredient' value={this.state.food.firstIngredient} placeholder='Enter your ingredient' onChange={this.handleChange} /> 
                      </Grid.Column>
                    </Grid>
                    {this.state.ingredients.map((field, index) => {
                      return (
                        <Grid key={index}>
                          <Grid.Column width={14}>
                            <Input label={index+2} name='ingredients' placeholder='Enter your ingredient' value={field} onChange={(e) => this.handleAddIngredient(e, index)} />
                          </Grid.Column>
                          <Grid.Column width={2}>
                            <Icon name='minus circle' size='large' style={{ padding: '10px' }} onClick={(e) => this.removeIngredientField(index)}/>
                          </Grid.Column>
                        </Grid>
                      )}
                    )}
                    <Grid>
                      <Grid.Column width={14}>
                        <Button floated='right' fluid onClick={this.addIngredientField}><Icon name='plus' />Add Ingredient</Button>
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
                  <Grid.Column>
                    {this.state.steps.map((field, index) => {
                      return (
                        <Grid key={index}>
                          <Grid.Column width={3}>
                            <Label pointing='right' size='large'>Step {index+1}</Label>
                          </Grid.Column>
                          <Grid.Column width={11}>
                            <TextArea name='ingredients' placeholder='Enter your description' value={field} onChange={(e) => this.handleAddStep(e, index)} />
                          </Grid.Column>
                          <Grid.Column width={2}>
                            <Icon name='minus circle' size='large' style={{ padding: '10px' }} onClick={(e) => this.removeStepField(index)}/>
                          </Grid.Column>
                        </Grid>
                      )}
                    )}
                    <Grid>
                      <Grid.Column width={16}>
                        <Button floated='right' fluid onClick={this.addStepField}><Icon name='plus' />Add Steps</Button>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </Form.Field>
            </Grid.Column>
          </Grid>
          <div id="submit">
            <Button id="submit-button" onClick={this.handleSubmit}>Submit</Button>
          </div>
        </Form>
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
      addFood,
      editFood
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(AddFood);
  