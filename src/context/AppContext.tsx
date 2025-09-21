import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Room, RoomMember, RoomActivity, Product, PackingList, Cart, CartItem } from '../types';
import { mockUser, generateMockProducts } from '../utils/mockData';

interface AppState {
  user: User | null;
  currentRoom: Room | null;
  roomMembers: RoomMember[];
  roomActivities: RoomActivity[];
  products: Product[];
  recommendations: Product[];
  packingList: PackingList | null;
  cart: Cart;
  isSecretMode: boolean;
  isConnected: boolean;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CURRENT_ROOM'; payload: Room | null }
  | { type: 'SET_ROOM_MEMBERS'; payload: RoomMember[] }
  | { type: 'ADD_ACTIVITY'; payload: RoomActivity }
  | { type: 'SET_ACTIVITIES'; payload: RoomActivity[] }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_RECOMMENDATIONS'; payload: Product[] }
  | { type: 'SET_PACKING_LIST'; payload: PackingList }
  | { type: 'UPDATE_PACKING_ITEM'; payload: { itemId: string; isSelected: boolean } }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_SECRET_MODE' }
  | { type: 'SET_CONNECTION_STATUS'; payload: boolean }
  | { type: 'UPDATE_MEMBER_STATUS'; payload: { userId: string; isOnline: boolean } };

const initialState: AppState = {
  user: null,
  currentRoom: null,
  roomMembers: [],
  roomActivities: [],
  products: [],
  recommendations: [],
  packingList: null,
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    lastUpdated: new Date(),
  },
  isSecretMode: false,
  isConnected: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'SET_ROOM_MEMBERS':
      return { ...state, roomMembers: action.payload };
    case 'ADD_ACTIVITY':
      return { 
        ...state, 
        roomActivities: [action.payload, ...state.roomActivities].slice(0, 50) 
      };
    case 'SET_ACTIVITIES':
      return { ...state, roomActivities: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_PACKING_LIST':
      return { ...state, packingList: action.payload };
    case 'UPDATE_PACKING_ITEM':
      if (!state.packingList) return state;
      return {
        ...state,
        packingList: {
          ...state.packingList,
          items: state.packingList.items.map(item =>
            item.id === action.payload.itemId
              ? { ...item, isSelected: action.payload.isSelected }
              : item
          ),
          selectedItems: state.packingList.items
            .map(item => item.id === action.payload.itemId 
              ? action.payload.isSelected 
              : item.isSelected
            )
            .filter(Boolean).length,
        },
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.items.find(item => 
        item.product.id === action.payload.product.id &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );
      
      let newItems;
      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.cart.items, action.payload];
      }
      
      return {
        ...state,
        cart: {
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
          lastUpdated: new Date(),
        },
      };
    case 'REMOVE_FROM_CART':
      const filteredItems = state.cart.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        cart: {
          items: filteredItems,
          totalItems: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: filteredItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
          lastUpdated: new Date(),
        },
      };
    case 'UPDATE_CART_ITEM_QUANTITY':
      const updatedItems = state.cart.items.map(item =>
        item.id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        cart: {
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
          lastUpdated: new Date(),
        },
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
          lastUpdated: new Date(),
        },
      };
    case 'TOGGLE_SECRET_MODE':
      return { ...state, isSecretMode: !state.isSecretMode };
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload };
    case 'UPDATE_MEMBER_STATUS':
      return {
        ...state,
        roomMembers: state.roomMembers.map(member =>
          member.userId === action.payload.userId
            ? { ...member, isOnline: action.payload.isOnline }
            : member
        ),
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Initialize with mock user and products
    dispatch({ type: 'SET_USER', payload: mockUser });
    dispatch({ type: 'SET_PRODUCTS', payload: generateMockProducts(50) });
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: true });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
