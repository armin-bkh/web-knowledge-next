import { http } from "@/services/httpServices";

export type TAuthBody = {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
};

const authRequestConfig = { withCredentials: true };

export function initAuth() {
  return http.get("/users/load", authRequestConfig);
}

export function login(user: TAuthBody) {
  return http.post("/users/signin", user, authRequestConfig);
}

export function signup(user: TAuthBody) {
  return http.post("/users/signup", user, authRequestConfig);
}

export function logout() {
  return http.get("users/logout", authRequestConfig);
}
