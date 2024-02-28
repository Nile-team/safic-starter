import express, { Express, Request, Response } from "express";
import { router } from "./routes/router";
import { validators } from "./utils/validation";
import { retrieveCSVFromSFTP } from "./services/retrieveCSVFromSFTP";

const app: Express = express();

app.use(router);

retrieveCSVFromSFTP(validators).then(() => {
  console.log("CSV file retrieved from SFTP server");
});

app.listen(3001, () => {
  console.log("Server is running http://localhost:3001");
});
