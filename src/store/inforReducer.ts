import { Reducer } from "react";
import { Action, Information } from "../types";
import { CHANGE_INFO_DESC, CHANGE_INFO_NAME } from "../constant";

export const inForReducer: Reducer<Information, Action> = (state, action) => {
  switch (action.type) {
    case CHANGE_INFO_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_INFO_DESC:
      return {
        ...state,
        describe: action.payload,
      };
    default:
      return state;
  }
};
