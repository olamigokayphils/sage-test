import { GET_INVESTMENTS, ADD_INVESTMENT, UPDATE_INVESTMENT, DELETE_INVESTMENT } from "../actions/types";

const initialState = {
  investments : []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVESTMENTS:
      return {
        ...state,
        investments: [...state.investments, action.payload],
      };

      case DELETE_INVESTMENT:
        return{
          ...state,
          investments: [...state.investments, action.payload.data]
        }

        case ADD_INVESTMENT:
          return{
            ...state,
            investments: [...state.investments, action.payload.data]
          }
    default:
      return state;
  }
}
