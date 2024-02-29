import { hubspotClient } from "../utils/hubspotConfig";

const searchContacts = async (email: string): Promise<boolean> => {
  const searchRequest: any = {
    query: email,
    limit: 1,
    properties: ["email"],
  };

  try {
    const response = await hubspotClient.crm.contacts.searchApi.doSearch(
      searchRequest
    );
    console.log("Search contacts response:", response);
    return response.total > 0;
  } catch (error) {
    console.error("Error searching contacts:", error);
    throw error;
  }
};

export { searchContacts };