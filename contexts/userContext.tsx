import { createContext, useState, type ReactNode, useEffect } from "react";
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
  authChecked: boolean
};

export const userContext = createContext<UserContextValue | null>(null);

type UserProviderProps = { children: ReactNode };

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const [authChecked, setAuthChecked]= useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser({ id: response.$id, email: response.email });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    console.log("User logged out")
    setUser(null);
  };

  const getInitialUserValue = async() =>{
    try{
      const response = await account.get()
      setUser({ id: response.$id, email: response.email });
    }catch(error:any){
      setUser(null)
    }finally{
      setAuthChecked(true);
    }
  }

  useEffect(()=>{
    getInitialUserValue();
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, login, register, logout, authChecked }}>
      {children}
    </userContext.Provider>
  );
};
