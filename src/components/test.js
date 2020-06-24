import React, { Component } from 'react';

import { Form, Select, Divider, Grid, Input, TextArea, Icon, Label, Button, Header } from 'semantic-ui-react';

export default class AddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addIngredients: [],
      firstIngredient: '',
      addDescription: []
    }
  }

  addField = () => {
    this.setState({
      addIngredients: [...this.state.addIngredients, '']
    })
  }

  removeField  = (index) => {
    const { addIngredients } = this.state

    for( let i = 0; i < addIngredients.length; i++){
      if(i === index)
        addIngredients.splice(i,1);
    }

    this.setState({
      addIngredients
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddIngredient = (e, index) => {
    this.state.addIngredients[index] = e.target.value
    this.setState({
      addIngredients: this.state.addIngredients
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Add Food</h3>
        <Divider />
        <Form id="form">
          <Grid>
            <Grid.Column width={8}>
              <h3>Basics</h3>
              <Divider />
              <Form.Input label='Name' placeholder='Enter food name' width={14} />
              <Form.Input label='Description' width={14}>
                <TextArea  placeholder='Enter your food description' />
              </Form.Input>
              <Form.Input type='file' label='Food Image' width={14} />
              <h3>Recipe</h3>
              <Divider />
            </Grid.Column>
            <Grid.Column width={8}>
              <h3>Description</h3>
              <Divider />
              <Form.Field>
                <Grid>
                  <Grid.Column>
                    {this.state.addIngredients.map((field, index) => {
                      return (
                        <Grid key={index}>
                          <Grid.Column width={3}>
                            <Label pointing='right' size='large'>Step {index+1}</Label>
                          </Grid.Column>
                          <Grid.Column width={11}>
                            <TextArea name='addIngredients' placeholder='Enter your description' value={field} onChange={(e) => this.handleAddIngredient(e, index)} />
                          </Grid.Column>
                          <Grid.Column width={2}>
                            <Icon name='minus circle' size='large' style={{ padding: '10px' }} onClick={(e) => this.removeField(index)}/>
                          </Grid.Column>
                        </Grid>
                      )}
                    )}
                    <Grid>
                      <Grid.Column width={16}>
                        <Button floated='right' fluid onClick={this.addField}><Icon name='plus' />Add Steps</Button>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Form.Field>
            <Grid>
              <Grid.Column width={2}>
                <Header as='h5'>Add Ingredients</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <Grid>
                  <Grid.Column width={14}>
                    <Input label='1' name='firstIngredient' placeholder='Enter your ingredient' value={this.state.firstIngredient} onChange={this.handleChange} /> 
                  </Grid.Column>
                </Grid>
                {this.state.addIngredients.map((field, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Column width={14}>
                        <Input label={index+2} name='addIngredients' placeholder='Enter your ingredient' value={field} onChange={(e) => this.handleAddIngredient(e, index)} />
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Icon name='minus circle' size='large' style={{ padding: '10px' }} onClick={(e) => this.removeField(index)}/>
                      </Grid.Column>
                    </Grid>
                  )}
                )}
                <Grid>
                  <Grid.Column width={14}>
                    <Button floated='right' fluid onClick={this.addField}><Icon name='plus' />Add Field</Button>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </Form.Field>
        </Form>
      </div>
    )
  }
}
