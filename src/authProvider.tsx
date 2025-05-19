import { AuthProvider } from "react-admin";
import { AuthResponse } from "./types/Auth";
import { jwtDecode } from "jwt-decode";
import { AUTH_KEY, BACKEND_URL } from "./constant";

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    const request = new Request(BACKEND_URL + "/auth/email/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    let response;
    try {
      response = await fetch(request);
    } catch (_error) {
      if (_error instanceof Error) {
        throw new Error(_error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    const auth = (await response.json()) as AuthResponse;

    if (auth?.user?.role?.name.toLocaleLowerCase() !== "admin") {
      throw new Error("You are not authorized to access this application");
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  },
  async checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(AUTH_KEY);
      throw new Error("Session expired");
    }
  },
  async checkAuth() {
    if (!localStorage.getItem(AUTH_KEY)) {
      throw new Error("Not authenticated");
    }
    const auth = JSON.parse(
      localStorage.getItem(AUTH_KEY) || "{}",
    ) as AuthResponse;
    const decodedToken = jwtDecode<{ exp: number }>(auth.token);
    const isExpired = decodedToken.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem(AUTH_KEY);
      throw new Error("Session expired");
    }
  },
  async logout() {
    const auth = JSON.parse(
      localStorage.getItem(AUTH_KEY) || "{}",
    ) as AuthResponse;
    const request = new Request(BACKEND_URL + "/auth/logout", {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${auth.token}`,
      }),
    });
    try {
      await fetch(request);
      localStorage.removeItem(AUTH_KEY);
    } catch (_error) {
      if (_error instanceof Error) {
        throw new Error(_error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  },

  async getIdentity() {
    const authCredentials = JSON.parse(
      localStorage.getItem(AUTH_KEY) || "{}",
    ) as AuthResponse;

    return {
      id: authCredentials.user.id,
      fullName:
        authCredentials.user.firstName + " " + authCredentials.user.lastName,
      avatar:
        typeof authCredentials.user.photo === "string"
          ? authCredentials.user.photo
          : authCredentials.user.photo?.path || "",
    };
  },
};
