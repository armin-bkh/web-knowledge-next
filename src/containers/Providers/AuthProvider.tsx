import React, { createContext, Reducer, useCallback, useContext } from "react";
import { AsyncActionHandlers, useReducerAsync } from "use-reducer-async";
import toast from "react-hot-toast";

import { ToastMode } from "@/global/toast";
import { login, signup } from "@/services/auth";
import { TLoginForm } from "@/pages/auth/login";
import { TSignupForm } from "@/pages/auth/signup";

const initialState: TAuthState = {
  user: null,
  error: null,
  loading: false,
};

export const AuthContext = createContext<TAuthState>(initialState);
export const AuthDispatcherContext = createContext<
  React.Dispatch<TAuthAction | TAsyncActions>
>({} as React.Dispatch<TAuthAction | TAsyncActions>);

export type TUser = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
};

export type TAuthState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

export const AUTH_PENDING = "AUTH_PENDING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";

export type TAuthAction =
  | { type: "AUTH_PENDING" }
  | { type: "LOGOUT" }
  | { type: "AUTH_SUCCESS"; payload: TUser }
  | { type: "AUTH_FAILURE"; payload: string };

const reducer = (state: TAuthState, action: TAuthAction) => {
  switch (action.type) {
    case AUTH_PENDING: {
      return {
        error: null,
        user: null,
        loading: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        user: action.payload,
        error: null,
        loading: false,
      };
    }
    case AUTH_FAILURE: {
      return {
        user: null,
        error: action.payload,
        loading: false,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export type TAsyncActions =
  | { type: "LOGIN"; payload: TLoginForm }
  | { type: "SIGNUP"; payload: TSignupForm };

const asyncActionsHandler: AsyncActionHandlers<
  Reducer<TAuthState, TAuthAction>,
  TAsyncActions
> = {
  LOGIN:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: AUTH_PENDING });
      try {
        const { data } = await login(action.payload);
        dispatch({ type: AUTH_SUCCESS, payload: data });
        toast[ToastMode.SUCCESS]("welcome back to web-knowledge!");
      } catch (e: any) {
        console.log(e, "error ");
        dispatch({ type: AUTH_FAILURE, payload: e.response.data.message });
        toast[ToastMode.ERROR](e.response.data.message);
      }
    },
  SIGNUP:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: AUTH_PENDING });
      try {
        const { confirmPassword, ...payload } = action.payload;
        const { data } = await signup(payload);
        dispatch({ type: AUTH_SUCCESS, payload: data });
        toast[ToastMode.SUCCESS]("welcome to web-knowledge!");
      } catch (e: any) {
        console.log(e, "error ");
        dispatch({ type: AUTH_FAILURE, payload: e.response.data.message });
        toast[ToastMode.ERROR](e.response.data.message);
      }
    },
};

export type TAuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props;

  const [auth, dispatch] = useReducerAsync<
    Reducer<TAuthState, TAuthAction>,
    TAsyncActions
  >(reducer, initialState, asyncActionsHandler);

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatcherContext.Provider value={dispatch}>
        {children}
      </AuthDispatcherContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => {
  const dispatch = useContext(AuthDispatcherContext);

  const handleLogin = useCallback(
    (user: TLoginForm) => {
      dispatch({ type: "LOGIN", payload: user });
    },
    [dispatch]
  );

  const handleSignup = useCallback(
    (user: TSignupForm) => {
      dispatch({ type: "SIGNUP", payload: user });
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {}, []);

  return {
    handleLogin,
    handleSignup,
  };
};
