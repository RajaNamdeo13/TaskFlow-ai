import { createApp } from "./app.ts";
import { env } from "./config/env.ts";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`TaskFlow AI API listening on http://localhost:${env.PORT}`);
});
