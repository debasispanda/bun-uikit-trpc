import { serve } from "bun";
import { createBunServeHandler } from "trpc-bun-adapter";
import { appRouter } from "./routes";

// const server = serve({
//   port: 3000,
//   routes: {
//     "/": () => new Response("Welcome to Bun!"),
//     "/api/notes": async (req) => {
//       const notes: INote[] = [];
//       return Response.json({ notes });
//     },
//   },
// });

const server = serve(
  createBunServeHandler({
    endpoint: "/trpc",
    router: appRouter,
    responseMeta() {
      return {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      };
    },
  }),
);

console.log(`Listening on localhost:${server.port}`);
