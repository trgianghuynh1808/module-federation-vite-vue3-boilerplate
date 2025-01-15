import {
  ApolloClient,
  type FetchResult,
  InMemoryCache,
  Observable,
  createHttpLink,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import type { ExecutionResult } from "graphql";
import type { ObjMap } from "graphql/jsutils/ObjMap";
import { i18n } from "@/locales";

// internal modules
import { EErrorCode } from "@/enums";
// import { useAppStore } from "@/stores/app.store";

let isTokenRefreshing = false;

const httpLink = createHttpLink({
  uri: "YOUR_GRAPHQL_ENDPOINT",
  fetchOptions: {},
  fetch: (uri, options) => {
    const time = new Date();

    const customOptions: RequestInit = {
      ...options,
      headers: {
        ...options?.headers,
        oid: localStorage.getItem("_k_oid") || "",
        authorization: localStorage.getItem("_k_aut") || "",
        "accept-language": i18n.global.locale.value,
      },
    };

    return fetch(uri + `?time=${time.getTime()}`, customOptions);
  },
});

const CASE_REFRESH_TOKEN = [EErrorCode.TOKEN_EXPIRED];
const CASE_ERROR_CODE = [
  EErrorCode.BAD_REQUEST,
  EErrorCode.INTERNAL_SERVER_ERROR,
  EErrorCode.FORBIDDEN,
  EErrorCode.DATA_ERROR,
];
const CASE_UNAUTHENTICATED = [
  EErrorCode.UNAUTHENTICATED,
  EErrorCode.SESSION_EXPIRED,
];

const callbacks: { [key: string]: Function } = {
  // AUTH_REFRESH_TOKEN_TIMEOUT() {
  //   const appStore = useAppStore();
  //   appStore.setSessionExpired(true);
  // },
};

const checkResolverError = (response?: ExecutionResult): boolean => {
  let firstValue = undefined;

  if (response?.data) {
    const firstKey = Object.keys(response.data)[0];
    firstValue = response.data[firstKey];
  }

  return [firstValue, response?.errors?.length].every((item) => Boolean(item));
};

const errorLink = onError(({ graphQLErrors, operation, response, forward }) => {
  if (!graphQLErrors) return;

  const error = graphQLErrors.find((e) =>
    [
      ...CASE_ERROR_CODE,
      ...CASE_UNAUTHENTICATED,
      ...CASE_REFRESH_TOKEN,
    ].includes(<EErrorCode>e?.extensions?.code)
  );

  if (!error) return;

  const handleClearToken = () => {
    localStorage.removeItem("_k_aut"); // Clear token
    window.location.href = "/"; // Redirect to home
  };

  const errorCode = <EErrorCode>error?.extensions?.code;

  if (CASE_UNAUTHENTICATED.includes(errorCode)) {
    return handleClearToken();
  }

  if (CASE_REFRESH_TOKEN.includes(errorCode)) {
    return new Observable((observer) => {
      if (isTokenRefreshing) {
        setTimeout(() => {
          const { headers } = operation.getContext();
          operation.setContext({
            headers: {
              ...headers,
              authorization: localStorage.getItem("_k_aut"),
            },
          });
          forward(operation).subscribe(observer);
        }, 500);

        return;
      }

      isTokenRefreshing = true;

      // Implement your refresh token logic here
      refreshToken().then((ok) => {
        isTokenRefreshing = false;
        if (ok) {
          const { headers } = operation.getContext();
          operation.setContext({
            headers: {
              ...headers,
              authorization: localStorage.getItem("_k_aut"),
            },
          });
          forward(operation).subscribe(observer);
        } else {
          return handleClearToken();
        }
      });
    });
  }

  if (CASE_ERROR_CODE.includes(errorCode)) {
    return new Observable((observer) => {
      const isResolverError = checkResolverError(
        response as ExecutionResult<ObjMap<unknown>, ObjMap<unknown>>
      );

      callbacks[errorCode] && callbacks[errorCode]();

      if (isResolverError) {
        return observer.error(response);
      }

      observer.next(<FetchResult>response);
    });
  }
});

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Helper function for token refresh
// TODO: Implement your token refresh logic here
async function refreshToken(): Promise<boolean> {
  // Implement your token refresh logic here
  return false;
}
