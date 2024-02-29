import { hubspotClient } from "../utils/hubspotConfig";

const handleGetContactById = async (contactId: string) => {
  try {
    const contactResponse = await hubspotClient.crm.contacts.basicApi.getById(
      contactId
    );
    return contactResponse;
  } catch (error) {
    console.error(`Error fetching contact details for ID ${contactId}:`, error);
    return null;
  }
};

export { handleGetContactById };
