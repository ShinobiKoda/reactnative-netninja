import { createContext, useEffect, useState, type ReactNode } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
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
  id?: string;
};

type BooksProviderProps = {
  children: ReactNode;
};

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

export const BooksContext = createContext<BooksContextValue | null>(null);

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useUser();

  const fetchBooks = async () => {
    try {
      if (!user?.id) throw new Error("Not authenticated");
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("userid", user.id),
      ]);
      const mapped = response.documents.map((doc: any) => ({
        id: doc.$id,
        title: doc.title,
        author: doc.author,
        description: doc.description,
        userid: doc.userid,
      }));
      setBooks(mapped);
    } catch (error) {
      console.error("Create book error:", error);
      throw error;
    }
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
      const created: Book = {
        id: (newBook as any).$id,
        title: (newBook as any).title,
        author: (newBook as any).author,
        description: (newBook as any).description,
        userid: (newBook as any).userid,
      };
      setBooks((prev) => [created, ...prev]);
    } catch (error) {
      console.error("Create book error:", error);
      throw error;
    }
  };

  const deleteBook = async (id: string) => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBooksById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};
