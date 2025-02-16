import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

interface UserState {
  id: string | null;
  email: string | null;
  psn: string | null;
  role: number;
  verified: boolean;
  psnAvatar: string | null;
  psnPlus: boolean;
  accountLevel: 'standard' | 'premium';
}

const initialState = {
  id: null,
  email: null,
  psn: null,
  role: 0,
  verified: false,
  psnAvatar: null,
  psnPlus: false,
  accountLevel: 'standard',
}

type UserAction =
  | { type: 'SET_USER'; payload: Partial<UserState> }
  | { type: 'RESET_USER' };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_USER':
      return {
        ...state,
        id: null,
        email: null,
        psn: null,
        role: 0,
        verified: false,
        psnAvatar: null,
        psnPlus: false,
        accountLevel: 'standard',
      };
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const persistedState = localStorage.getItem('userState');
  const [state, dispatch] = useReducer(
    userReducer,
    persistedState ? JSON.parse(persistedState) : initialState
  );

  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}