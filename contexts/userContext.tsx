import { createContext, useState, type ReactNode } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export type User = {
  id: string;
  email: string;
} | null;

export type UserContextValue = {
  user: User;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const userContext = createContext<UserContextValue | null>(null);

type UserProviderProps = { children: ReactNode };

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(null);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser({ id: response.$id, email: response.email });
    } catch (err) {
      throw new Error(`Error : ${err}`);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (err) {
      throw new Error(`Error : ${err}`);
    }
  };

  const logout = async () => {
    // TODO: implement logout
  };

  return (
    <userContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </userContext.Provider>
  );
};
