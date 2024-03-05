import { hubspotClient } from "../utils/hubspotConfig";
import { Request, Response } from "express";

const getDealById = async (req: Request, res: Response) => {
  const dealId = req.params.id;
  try {
    const dealResponse = await hubspotClient.crm.deals.basicApi.getById(dealId);
    res.status(200).json(dealResponse);
  } catch (error) {
    console.error(`Error fetching deal details for ID ${dealId}:`, error);
    res.status(500).json(error);
  }
};

export { getDealById };
