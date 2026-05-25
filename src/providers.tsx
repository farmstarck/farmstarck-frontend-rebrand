"use client";

import { renderAxiosOrAuthError } from "@/lib/axios-client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";

let redirecting = false;

export function redirectToSignIn() {
  if (redirecting) return;
  redirecting = true;

  window.location.replace("/signin");
}

const isAuthError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const status = (error as { response?: { status?: number } })?.response?.status;

  return status === 401 || status === 403;
};

const globalErrorHandler = (error: unknown) => {
  if (typeof window === "undefined") return;

  if (isAuthError(error)) {
    redirectToSignIn();
    return;
  }

  const msg = renderAxiosOrAuthError(error);
  toast.error(msg);
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          if (isAuthError(error)) return false;
          return failureCount < 1;
        },
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: globalErrorHandler,
    }),
    mutationCache: new MutationCache({
      onError: globalErrorHandler,
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
