import { createContext, useState, type ReactNode } from "react";

export type BooksContextValue = {
  books: Book[];
  fetchBooks: () =>Promise<void>
  fetchBooksById: (id: string) => Promise<void>
  createBook: (data: Book) => Promise<void>
  deleteBook: (id: string) => Promise<void>
};

export type Book = {
  title: string;
  author: string;
  description: string;
  userid: string;
};

type BooksProviderProps = {
  children: ReactNode;
};

const databaseId = process.env.DATABASE_ID;
const collectionId = process.env.COLLECTION_ID

export const BooksContext = createContext<BooksContextValue | null>(null);

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async() => {
    try{

    }catch(error){

    }
  }

  const fetchBooksById = async(id: string) => {
    try{

    }catch(error){
      
    }
  }

   const createBook = async(data: Book) => {
    try{

    }catch(error){
      
    }
  }

   const deleteBook = async(id: string) => {
    try{

    }catch(error){
      
    }
  }

  return (
    <BooksContext.Provider value={{books, fetchBooks, fetchBooksById, createBook, deleteBook}}>
      {children}
    </BooksContext.Provider>
  )
};
