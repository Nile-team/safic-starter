import express, { Express, Request, Response } from "express";
import { router } from "./routes/router";

const app: Express = express();

app.use(router);

app.listen(3001, () => {
  console.log("Server is running http://localhost:3001");
});
