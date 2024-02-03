import { createServer, httpListener } from "@marblejs/http";
import { logger$ } from "@marblejs/middleware-logger";
import { bodyParser$ } from "@marblejs/middleware-body";
import { postsApi$ } from "./src/apis/posts.api";
 
export const listener = httpListener({
  middlewares: [logger$(), bodyParser$()],
  effects: [postsApi$],
});
 
const main = async () => {
  const server = await createServer({
    port: 3000,
    hostname: "127.0.0.1",
    listener,
  });
 
  await server();
}
 
main();