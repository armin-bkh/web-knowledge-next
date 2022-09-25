import { http } from "@/services/httpServices";

export type TAuthBody = {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
};

export function initAuth() {
  return http.get("/users/load");
}

export function login(user: TAuthBody) {
  return http.post("/users/signin", user);
}

export function signup(user: TAuthBody) {
  return http.post("/users/signup", user);
}

export function logout() {
  return http.get("users/logout");
}
