import { hubspotClient } from "../utils/hubspotConfig";
import { Request, Response } from "express";

const getHubspotContact = async (req: Request, res: Response) => {
  const limit = undefined;
  const after = undefined;
  const properties = undefined;
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived
    );
    res.status(200).json(apiResponse);
  } catch (e: any) {
    e.message === "HTTP request failed"
      ? res.status(500).json(e.response)
      : res.status(500).json(e);
  }
};

export { getHubspotContact };

