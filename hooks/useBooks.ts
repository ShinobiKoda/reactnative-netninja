import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export const useBooks = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks must be used within BooksP rovider");
  }

  return context;
};
