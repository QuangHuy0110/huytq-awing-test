import { useAppContext } from ".";

// Using useAppContext to access the context

export const CampaignsState = () => {
  const { state } = useAppContext();
  return state.campaigns;
};

export const informationSelector = () => {
  return CampaignsState().information;
};

export const subCampaignsSelector = () => {
  return CampaignsState().subCampaigns;
};

export const errorSelector = () => {
  const checkInforName = informationSelector().name !== "";
  const checkSubName = subCampaignsSelector().every((item) => item.name !== "");
  const checkSubAddName = subCampaignsSelector().every((item) =>
    item.ads.every((item) => item.name !== "")
  );
  const checkSubAddQuantity = subCampaignsSelector().every((item) =>
    item.ads.every((item) => item.quantity > 0)
  );
  return !(
    checkInforName &&
    checkSubName &&
    checkSubAddName &&
    checkSubAddQuantity
  );
};
