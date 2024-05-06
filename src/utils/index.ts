import { RootState } from "../types";

export function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${random}`;
  }

  export function formatCampains(state: RootState) {
    const { campaigns } = state;
  
    const formattedJson = {
      campaign: {
        information: campaigns.information,
        subCampaigns: campaigns.subCampaigns.map((subCampaign) => {
          const { id, ...rest } = subCampaign;
          return {
            ...rest,
            ads: subCampaign.ads.map((ad) => {
              const { id, checked, ...restAd } = ad;
              return restAd;
            }),
          };
        }),
      },
    };
  
    return formattedJson;
  }