import express, { Express, Request, Response } from "express";
import { json } from "body-parser";

const app: Express = express();
app.use(json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server is running http://localhost:3001");
});
