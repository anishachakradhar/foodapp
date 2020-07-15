const initialState = {
  foods: [],
};

export default function addFoodReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FOOD':
      return {
        foods: [...state.foods, action.payload],
      };
    case 'DELETE_FOOD':
      return {
        foods: state.foods.filter((food) => food.id !== action.id),
      };
    case 'EDIT_FOOD':
      return {
        foods: state.foods.map((food) => {
          if (food.id !== action.payload.id) {
            return food;
          }
          return action.payload;
        }),
      };
    default:
      return state;
  }
}

export function addFood(payload) {
  return {
    type: 'ADD_FOOD',
    payload,
  };
}

export function deleteFood(id) {
  return {
    type: 'DELETE_FOOD',
    id,
  };
}

export function editFood(payload) {
  return {
    type: 'EDIT_FOOD',
    payload,
  };
}
