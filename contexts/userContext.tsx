import { createContext, useState, type ReactNode } from "react";

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
    // TODO: implement login
  };
  const register = async (email: string, password: string) => {
    // TODO: implement register
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
