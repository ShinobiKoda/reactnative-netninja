import { createContext, useEffect, useState, type ReactNode } from "react";
import { databases } from "../lib/appwrite";
import client from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

export type BooksContextValue = {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBooksById: (id: string) => Promise<Book | null>;
  fetchBookById: (id: string) => Promise<Book | null>;
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
      console.error("Fetch books error:", error);
      throw error;
    }
  };

  const fetchBooksById = async (id: string): Promise<Book | null> => {
    try {
      const doc = await databases.getDocument(databaseId, collectionId, id);
      const book: Book = {
        id: (doc as any).$id,
        title: (doc as any).title,
        author: (doc as any).author,
        description: (doc as any).description,
        userid: (doc as any).userid,
      };
      return book;
    } catch (error) {
      console.error("Fetch book by id error:", error);
      return null;
    }
  };

  const fetchBookById = async (id: string): Promise<Book | null> => {
    return fetchBooksById(id);
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
      // Rely on realtime subscription to add the created book.
      // This avoids double-insert races between local setState and realtime events.
    } catch (error) {
      console.error("Create book error:", error);
      throw error;
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
    } catch (error) {
      console.error("Create book error:", error);
      throw error;
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const channel = `databases.${databaseId}.collections.${collectionId}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response: any) => {
        const { payload, events } = response;

        const isCreate = events.some((e: string) => e.includes("create"));
        const isUpdate = events.some((e: string) => e.includes("update"));
        const isDelete = events.some((e: string) => e.includes("delete"));

        if (payload?.userid && payload.userid !== user.id) return;

        if (isCreate) {
          setBooks((prev) => {
            const created: Book = {
              id: payload.$id,
              title: payload.title,
              author: payload.author,
              description: payload.description,
              userid: payload.userid,
            };
            const next = [created, ...prev];
            // Ensure uniqueness by id to prevent duplicate entries
            const seen = new Set<string>();
            const unique = next.filter((b) => {
              const bid = b.id ?? `${b.title}-${b.author}`;
              if (seen.has(bid)) return false;
              seen.add(bid);
              return true;
            });
            return unique;
          });
        } else if (isUpdate) {
          setBooks((prev) =>
            prev.map((b) =>
              b.id === payload.$id
                ? {
                    id: payload.$id,
                    title: payload.title,
                    author: payload.author,
                    description: payload.description,
                    userid: payload.userid,
                  }
                : b
            )
          );
        } else if (isDelete) {
          setBooks((prev) => prev.filter((b) => b.id !== payload.$id));
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBooksById,
        fetchBookById,
        createBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
