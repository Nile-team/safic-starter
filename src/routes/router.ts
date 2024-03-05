import { Router } from "express";
import { json } from "body-parser";
import { getCSV } from "../controllers/getCsvController";
import { addCsvData } from "../controllers/postCsvController";
import { getHubspotContact } from "../controllers/getHubspotContactController";
import { getHubspotCompany } from "../controllers/getHubspotCompanyController";
import { getContactById } from "../controllers/getContactById";
import { getCompanyById } from "../controllers/getCompanyById";
import { getAllHubspotAssosiate } from "../controllers/getAllHubspotAssosiateController";
import { getHubspotDeals } from "../controllers/getHubspotDealController";
import { getDealById } from "../controllers/getDealById";

const router = Router();

router.use(json());
router.get("/", getCSV);
router.post("/", addCsvData);
router.get("/contact", getHubspotContact);
router.get("/company", getHubspotCompany);
router.get("/contact/:id", getContactById);
router.get("/company/:id", getCompanyById);
router.get("/associations", getAllHubspotAssosiate);
router.get("/deals", getHubspotDeals);
router.get("/deals/:id", getDealById);

export { router };
