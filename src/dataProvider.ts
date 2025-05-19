import crudProvider from "ra-data-nestjsx-crud";
import { DataProvider, fetchUtils, Options } from "react-admin";
import { AUTH_KEY, BACKEND_URL } from "./constant";
import { AuthResponse } from "./types/Auth";

const httpClient = (url: string, options: Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  } else if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers as HeadersInit);
  }
  const { token } = JSON.parse(
    localStorage.getItem(AUTH_KEY) || "{}",
  ) as AuthResponse;

  (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
  ...crudProvider(BACKEND_URL, httpClient),
  update: async (resource, params) => {
    const { json } = await httpClient(
      `${BACKEND_URL}/${resource}/${params.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(params.data),
      },
    );
    return { data: json };
  },
};
