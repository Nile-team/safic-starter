import { Router } from "express";
import { json } from "body-parser";
import { getcsv } from "../controllers/getCsvController";

const router = Router();
router.use(json());
router.get("/", getcsv);

export { router };
