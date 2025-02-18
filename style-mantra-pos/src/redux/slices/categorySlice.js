import {
  FETCH_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/categoryActions";

const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
      };
    default:
      return state;
  }
};

export default categoryReducer;
