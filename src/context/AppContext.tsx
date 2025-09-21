import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Room, RoomMember, RoomActivity, Product } from '../types';
import { mockUser, generateMockProducts } from '../utils/mockData';

interface AppState {
  user: User | null;
  currentRoom: Room | null;
  roomMembers: RoomMember[];
  roomActivities: RoomActivity[];
  products: Product[];
  recommendations: Product[];
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
  | { type: 'TOGGLE_SECRET_MODE' }
  | { type: 'SET_CONNECTION_STATUS'; payload: boolean }
  | { type: 'UPDATE_MEMBER_STATUS'; payload: { userId: string; isOnline: boolean } }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  currentRoom: null,
  roomMembers: [],
  roomActivities: [],
  products: [],
  recommendations: [],
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
    case 'LOGOUT':
      return {
        ...state,
        currentRoom: null,
        roomMembers: [],
        roomActivities: [],
        recommendations: [],
        isSecretMode: false,
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
