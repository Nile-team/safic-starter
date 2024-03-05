import { hubspotClient } from "../utils/hubspotConfig";

const handleGetDealById = async (dealId: string) => {
  try {
    const dealResponse = await hubspotClient.crm.deals.basicApi.getById(dealId);
    return dealResponse;
  } catch (error) {
    console.error(`Error fetching deal details for ID ${dealId}:`, error);
    return null;
  }
};

export { handleGetDealById };
