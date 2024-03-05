import { hubspotClient } from "../utils/hubspotConfig";
import { Request, Response } from "express";
import { handleGetContactById } from "../services/handleGetContactById";
import { handleGetDealById } from "../services/handleGetDealById";

const getAllHubspotAssosiate = async (req: Request, res: Response) => {
  const limit = undefined;
  const after = undefined;
  const properties = [
    "name",
    "createdate",
    "hs_lastmodifieddate",
    "hs_object_id",
  ];
  const propertiesWithHistory = undefined;
  const associations = ["contact"]; // Include associated contacts
  const archived = false;

  try {
    // Fetch companies with associated contacts
    const companiesResponse =
      await hubspotClient.crm.companies.basicApi.getPage(
        limit,
        after,
        properties,
        propertiesWithHistory,
        associations,
        archived
      );

    // Modify the response format to include contact details
    const formattedResponse = await Promise.all(
      companiesResponse.results.map(async (company) => {
        const { createdAt, archived, id, properties, updatedAt, associations } =
          company;
        const contacts =
          associations && associations.contacts
            ? associations.contacts.results
            : [];

        const deals = associations && associations.deals ? associations.deals.results : [];

        // Extract unique contact IDs
        const uniqueContactIds = [
          ...new Set(contacts.map((contact) => contact.id)),
        ];

        // Extract unique deal IDs
        const uniqueDealIds = [
          ...new Set(deals.map((deal) => deal.id)),
        ];

        // Fetch contact details for each unique contact ID
        const contactDetails = await Promise.all(
          uniqueContactIds.map((contactId) => handleGetContactById(contactId))
        );

        // Fetch deal details for each unique deal ID
        const dealDetails = await Promise.all(
          uniqueDealIds.map((dealId) => handleGetDealById(dealId))
        );

        return {
          createdAt,
          archived,
          id,
          properties,
          updatedAt,
          contacts: {
            results: contactDetails.filter(Boolean), // Remove null values
          },
          deals: {
            results: dealDetails.filter(Boolean), // Remove null values
          },
        };
      })
    );

    res.json({ results: formattedResponse });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Error fetching companies." });
  }
};

export { getAllHubspotAssosiate };

