import { http } from "@/services/httpServices";

export type TAuthBody = {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
};

export function login(user: TAuthBody) {
  return http.post("/users/signin", user, { withCredentials: true });
}
export function signup(user: TAuthBody) {
  return http.post("/users/signup", user, { withCredentials: true });
}
