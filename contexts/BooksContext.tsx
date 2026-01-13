import { createContext, useState, type ReactNode } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

export type BooksContextValue = {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBooksById: (id: string) => Promise<void>;
  createBook: (data: Book) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
};

export type Book = {
  title: string;
  author: string;
  description: string;
  userid?: string;
};

type BooksProviderProps = {
  children: ReactNode;
};

const databaseId =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID! || "69665e1a001df43960c4";
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID! || "books";

export const BooksContext = createContext<BooksContextValue | null>(null);

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useUser();

  const fetchBooks = async () => {
    try {
    } catch (error) {}
  };

  const fetchBooksById = async (id: string) => {
    try {
    } catch (error) {}
  };

  const createBook = async (data: Book) => {
    try {
      if (!user?.id) throw new Error("Not authenticated");
      const newBook = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        { ...data, userid: user.id },
        [
          Permission.read(Role.user(user.id)),
          Permission.update(Role.user(user.id)),
          Permission.delete(Role.user(user.id)),
        ]
      );
      setBooks((prev) => [{ ...data, userid: user.id }, ...prev]);
    } catch (error) {
      console.error("Create book error:", error);
      throw error;
    }
  };

  const deleteBook = async (id: string) => {
    try {
    } catch (error) {}
  };

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBooksById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};
