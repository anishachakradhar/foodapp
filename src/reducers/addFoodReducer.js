const initialState = {
  foods: []
}

export default function addFoodReducer( state = initialState, action) {
  switch(action.type) {
    case 'ADD_FOOD':
      const food = {}
      food.id            = action.id
      food.basics        = action.food
      food.ingredients   = action.ingredients
      food.steps         = action.steps
      return {
        foods: state.foods.concat([food])
      }
    case 'DELETE_FOOD':
      return {
        foods: state.foods.filter((food) => food.id !== action.id)
      }
    case 'EDIT_FOOD':
      const editedFood = {}
      editedFood.id            = action.id
      editedFood.basics        = action.food
      editedFood.ingredients   = action.ingredients
      editedFood.steps         = action.steps
      for (let i = 0; i < state.foods.length; i+=1) {
        if (state.foods[i].id === action.id) {
          const foods = [...state.foods]
          foods[i] = editedFood
          return foods
        }
      }
      break;
    default:
      return state;
  }
}

export function addFood(id, food, ingredients, steps) {
  return {
    type: 'ADD_FOOD',
    id,
    food,
    ingredients,
    steps
  }
}

export function deleteFood(id) {
  return {
    type: 'DELETE_FOOD',
    id
  }
}

export function editFood(id, food, ingredients, steps) {
  return {
    type: 'EDIT_FOOD',
    id,
    food,
    ingredients,
    steps
  }
}