import { createStore, combineReducers } from 'redux';

const counterInitialState = { counter: 0 };

export const counter = (state = counterInitialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

const cartInitialState = [];

export const cart = (state = cartInitialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'DELETE_ITEM':
      return state.filter((product) => product.id !== action.payload.id);
    default:
      return state;
  }
};

const rootReducer = combineReducers({ counter, cart });
const store = createStore(rootReducer);

export default store;