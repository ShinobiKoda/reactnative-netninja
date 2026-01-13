import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export const useBooks = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};
