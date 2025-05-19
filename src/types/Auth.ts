import { User } from "./User";

export interface AuthResponse {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: User;
}
