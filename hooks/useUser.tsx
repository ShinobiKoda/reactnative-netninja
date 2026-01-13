import { useContext } from "react";
import { userContext } from "../contexts/userContext";

export const useUser = () => {
  const context = useContext(userContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};
