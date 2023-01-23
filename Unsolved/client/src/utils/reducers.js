import { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// TODO: To get a better understand of how a reducer works - add comments to the various actions in the reducer
export const reducer = (state, action) => {
  switch (action.type) {
    // TODO: Add a comment describing the functionality of the UPDATE_PRODUCTS case
    // return a new state object that has all the existing state data but has a new array for the `products` field
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // TODO: Add a comment describing the functionality of the UPDATE_CART_QUANTITY case
    // receives an item ID as payload, used to find the item in the state using the find method and then increment its quantity by 1.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // TODO: Add a comment describing the functionality of the REMOVE_FROM_CART case
    //  Receives the item ID as a payload which is then used to remove from the state using the filter method.
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // TODO: Add a comment describing what the default case is for
    // returns initial state of value property
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
