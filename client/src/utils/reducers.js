import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
} from './actions';

import { useReducer } from 'react';

// create reducer func
export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return { 
        ...state,
        products: [...action.products],
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

      // if it's none of these acitons, do not update state at all and keep things the same.
      default: 
        return state;
  }
}

// useProductReducer will help us initialize our global state object
export function useProductReducer(initialState) {
  // then provide the functionality of the homemade reducer func,
  // (passing initialState as the second argument IS AN EASY WAY OF INITIALIZING THE useReducer STATE)
  return useReducer(reducer, initialState)
}