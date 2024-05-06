import React, { createContext, useReducer, useContext, ReactNode } from "react";
import rootReducer from "./rootReducer";
import { RootState } from "../types";
import { generateUniqueId } from "../utils";

const initialState: RootState = {
  campaigns: {
    information: { name: "", describe: "" },
    subCampaigns: [
      {
        id: generateUniqueId(),
        name: "Chiến dịch con 1",
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
    ],
  },
};

type AppContextType = {
  state: RootState;
  dispatch: React.Dispatch<any>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
