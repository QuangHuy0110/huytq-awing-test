import { Reducer } from "react";
import { Action, SubCampaigns } from "../types";
import { ADD_SUB_CAMPAINS, HANDLE_CHANGE_SUBCAMP } from "../constant";
import { generateUniqueId } from "../utils";

export const subCampaignsReducer: Reducer<SubCampaigns[], Action> = (
  state,
  action
) => {
  switch (action.type) {
    case ADD_SUB_CAMPAINS:
      return [
        ...state,
        {
          id: generateUniqueId(),
          name: `Chiến dịch con ${state.length + 1}`,
          status: true,
          ads: [
            {
              id: generateUniqueId(),
              name: "Quảng cáo 1",
              quantity: 0,
              checked: false,
            },
          ],
        },
      ];
    case HANDLE_CHANGE_SUBCAMP:
      return state.map((subCampaign) =>
        subCampaign.id === action.payload.id ? action.payload : subCampaign
      );
    default:
      return state;
  }
};
