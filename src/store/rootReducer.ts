// rootReducer.ts

import { Reducer } from "react";
import { Action, RootState } from "../types";
import { inForReducer } from "./inforReducer";
import { subCampaignsReducer } from "./subCampReducer";

const rootReducer: Reducer<RootState, Action> = (state, action) => ({
  campaigns: {
    information: inForReducer(state.campaigns?.information, action),
    subCampaigns: subCampaignsReducer(state.campaigns?.subCampaigns, action),
  },
});

export default rootReducer;
