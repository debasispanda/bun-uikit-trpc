import type { ReactNode } from "react";
import { trpc, queryClient, trpcClient } from "../api/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { HvProvider } from "@hitachivantara/uikit-react-core";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <HvProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </HvProvider>
  );
};
