const initialState = {
  foods: []
}

export default function addFoodReducer( state = initialState, action) {
  switch(action.type) {
    case 'ADD_FOOD':
      const foods = []
      foods.basics = action.food
      foods.ingredients = action.ingredients
      foods.steps = action.steps
      return {
        foods: state.foods.concat([foods])
      }
    case 'DELETE_FOOD':
      return {
        foods: state.foods.filter((food, i) => i !== action.index)
      }
    default:
      return state;
  }
}

export function addFood(food, ingredients, steps) {
  return {
    type: 'ADD_FOOD',
    food,
    ingredients,
    steps
  }
}

export function deleteFood(index) {
  return {
    type: 'DELETE_FOOD',
    index
  }
}