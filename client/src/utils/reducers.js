import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
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
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      }
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cartOpen: true,
        // spread operator in front of action.products because 
        // we dont want to affect the rest of the products
        // just like with categories and products
        cart: [...state.cart, ...action.products]
      }
    case REMOVE_FROM_CART:
      // filters through and only keeps the products that DON'T
      // match the provided _id property (action._id)
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });
      return {
        ...state,
        // if newState.length is 0 or less, false
        cartOpen: newState.length > 0,
        cart: newState
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        // we use map because we cant update state directly
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      }
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      }
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
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