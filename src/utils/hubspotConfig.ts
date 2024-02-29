import * as hubspot from "@hubspot/api-client";

import dotenv from "dotenv";

dotenv.config();

export const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_API_KEY,
});
