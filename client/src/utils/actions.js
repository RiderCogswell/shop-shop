// used by ProductList component, end goal is to have the
// data retrieved from products stored in the global state
// (this way we can add offline capabilities later and persist our product data)
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// similar to update projects
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// sort of connects the previous two in that we want to be
// able to select a category from the state created by the 
// UPDATE_CATEGORIES action, and display products for that 
// category from the list created from the UPDATE_PRODUCTS action
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

// these act as an explicit definition of how our applications state will be updated

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';