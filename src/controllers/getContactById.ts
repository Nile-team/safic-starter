import { hubspotClient } from "../utils/hubspotConfig";
import { Request, Response } from "express";

const getContactById = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  try {
    const contactResponse = await hubspotClient.crm.contacts.basicApi.getById(
      contactId
    );
    res.status(200).json(contactResponse);
  } catch (error) {
    console.error(`Error fetching contact details for ID ${contactId}:`, error);
    res.status(500).json(error);
  }
};

export { getContactById };
