export interface Ads {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
}

export interface SubCampaigns {
  id: string;
  name: string;
  status: boolean;
  ads: Ads[];
}

export interface Information {
  name: string;
  describe?: string;
}

export interface RootState {
  campaigns: {
    information: Information;
    subCampaigns: SubCampaigns[];
  };
}
export type Action = { type: string; payload: any };
