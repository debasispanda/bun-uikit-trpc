import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "@/server/routes";

export const trpc = createTRPCReact<AppRouter>();
export const queryClient = new QueryClient();
export const trpcClient = trpc.createClient({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: wsLink({
        client: createWSClient({
          url: "ws://localhost:3000/trpc"
        })
      }),
      false: httpBatchLink({ url: "http://localhost:3000/trpc" })
    }),
  ]
});
