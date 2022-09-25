import React, {
  createContext,
  Reducer,
  useCallback,
  useContext,
  useEffect,
} from "react";
import Router from "next/router";
import { AsyncActionHandlers, useReducerAsync } from "use-reducer-async";
import toast from "react-hot-toast";

import { ToastMode } from "@/global/toast";
import { initAuth, login, logout, signup } from "@/services/auth";
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
export const AUTH_CLEAR = "AUTH_CLEAR";

export type TAuthAction =
  | { type: "AUTH_PENDING" }
  | { type: "AUTH_CLEAR" }
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
    case AUTH_CLEAR: {
      return {
        ...initialState,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export type TAsyncActions =
  | { type: "LOGIN"; payload: TLoginForm }
  | { type: "SIGNUP"; payload: TSignupForm }
  | { type: "LOGOUT" }
  | { type: "INIT_AUTH" };

const asyncActionsHandler: AsyncActionHandlers<
  Reducer<TAuthState, TAuthAction>,
  TAsyncActions
> = {
  INIT_AUTH:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: AUTH_PENDING });
      try {
        const { data } = await initAuth();
        dispatch({ type: AUTH_SUCCESS, payload: data });
      } catch (e: any) {
        console.log(e, "error ");
        dispatch({ type: AUTH_FAILURE, payload: e.response.data.message });
      }
    },
  LOGIN:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: AUTH_PENDING });
      try {
        const { data } = await login(action.payload);
        dispatch({ type: AUTH_SUCCESS, payload: data });
        await Router.replace("/");
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
        await Router.replace("/");
        toast[ToastMode.SUCCESS]("welcome to web-knowledge!");
      } catch (e: any) {
        console.log(e, "error ");
        dispatch({ type: AUTH_FAILURE, payload: e.response.data.message });
        toast[ToastMode.ERROR](e.response.data.message);
      }
    },
  LOGOUT:
    ({ dispatch }) =>
    async (action) => {
      dispatch({ type: AUTH_PENDING });
      try {
        await logout();
        dispatch({ type: "AUTH_CLEAR" });
        await Router.replace("/");
      } catch (e: any) {
        console.log(e, "error ");
        dispatch({ type: AUTH_FAILURE, payload: e.response.data.message });
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

  useEffect(() => {
    dispatch({ type: "INIT_AUTH" });
  }, []);

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

  const handleLogout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  return {
    handleLogin,
    handleSignup,
    handleLogout,
  };
};
