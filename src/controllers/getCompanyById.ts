import { hubspotClient } from "../utils/hubspotConfig";
import { Request, Response } from "express";

const getCompanyById = async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const companyResponse = await hubspotClient.crm.companies.basicApi.getById(
      companyId
    );
    res.status(200).json(companyResponse);
  } catch (error) {
    console.error(`Error fetching company details for ID ${companyId}:`, error);
    res.status(500).json(error);
  }
};

export { getCompanyById };
