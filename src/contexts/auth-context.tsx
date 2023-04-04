/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useReducer, useRef } from 'react';

const enum HANDLERS {
  INITIALIZE,
  SIGN_IN,
  SIGN_OUT
}

// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null
// };

type initialStateType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  skip: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (_email: string, _name: string, _password: string) => Promise<never>;
  signOut: () => void;
};

const initialState: initialStateType = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  skip: () => {},
  signIn: async () => {},
  signUp: async () => {
    throw new Error('Not implemented');
  },
  signOut: () => {}
};

type actionType = {
  type: HANDLERS;
  payload?: any;
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state: typeof initialState, action: actionType) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user
          }
        : {
            isLoading: false
          })
    };
  },
  [HANDLERS.SIGN_IN]: (state: typeof initialState, action: actionType) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state: typeof initialState) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state: typeof initialState, action: actionType) => (handlers[action.type] ? handlers[action.type](state, action) : state);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: { children?: React.ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: 'https://material-kit-react.devias.io/assets/avatars/avatar-anika-visser.png',
        name: 'Anika Visser',
        email: 'anika.visser@devias.io'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email: string, password: string) => {
    if (email !== 'demo@devias.io' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (_email: string, _name: string, _password: string) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   children: PropTypes.node
// };

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
