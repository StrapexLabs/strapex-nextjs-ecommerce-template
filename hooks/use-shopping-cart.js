import React, { useContext, useReducer, useMemo } from 'react';
import useLocalStorageReducer from './use-local-storage-reducer';

// Reducers
const initialCartValues = {
  cartDetails: {},
  cartCount: 0,
  totalPrice: 0,
};

const addItem = (state = {}, product = null, quantity = 0, size = null) => {
  if (quantity <= 0 || !product) return state;
  const itemId = `${product.id}-${size}`;
  let entry = state?.cartDetails?.[itemId];

  // Update item
  if (entry) {
    entry.quantity += quantity;
  }
  // Add item
  else {
    entry = { ...product, quantity, size };
  }

  return {
    ...state,
    cartDetails: {
      ...state.cartDetails,
      [itemId]: entry,
    },
    cartCount: Math.max(0, state.cartCount + quantity),
    totalPrice: Math.max(state.totalPrice + product.price * quantity),
  };
};

const removeItem = (state = {}, product = null, quantity = 0, size = null) => {
  if (quantity <= 0 || !product) return state;
  const itemId = `${product.id}-${size}`;
  let entry = state?.cartDetails?.[itemId];

  console.log('removeItem', itemId, entry);

  if (entry) {
    // Remove item
    if (quantity >= entry.quantity) {
      const { [itemId]: id, ...details } = state.cartDetails;
      return {
        ...state,
        cartDetails: details,
        cartCount: Math.max(0, state.cartCount - entry.quantity),
        totalPrice: Math.max(
          0,
          state.totalPrice - product.price * entry.quantity
        ),
      };
    }
    // Update item
    else {
      return {
        ...state,
        cartDetails: {
          ...state.cartDetails,
          [itemId]: {
            ...entry,
            quantity: entry.quantity - quantity,
          },
        },
        cartCount: Math.max(0, state.cartCount - quantity),
        totalPrice: Math.max(0, state.totalPrice - product.price * quantity),
      };
    }
  } else {
    return state;
  }
};

const clearCart = () => {
  return initialCartValues;
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log('ADD_ITEM', action);
      return addItem(state, action.product, action.quantity, action.size);
    case 'REMOVE_ITEM':
      return removeItem(state, action.product, action.quantity, action.size);
    case 'CLEAR_CART':
      return clearCart();
    default:
      return state;
  }
};

// Context + Provider
const CartContext = React.createContext();

export const CartProvider = ({ currency = 'USD', children = null }) => {
  const [cart, dispatch] = useLocalStorageReducer(
    'cart',
    cartReducer,
    initialCartValues
  );

  const contextValue = useMemo(
    () => [
      {
        ...cart,
        currency,
      },
      dispatch,
    ],
    [cart, currency]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Hook
export const useShoppingCart = () => {
  const [cart, dispatch] = useContext(CartContext);

  const addItem = (product, quantity = 1, size = null) => 
    dispatch({ type: 'ADD_ITEM', product, quantity, size });

  const removeItem = (product, quantity = 1, size = null) =>
    dispatch({ type: 'REMOVE_ITEM', product, quantity, size });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const shoppingCart = {
    ...cart,
    addItem,
    removeItem,
    clearCart,
  };

  return shoppingCart;
};
