import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { type ReactNode } from "react";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

type GuestOnlyProps = { children: ReactNode };


const GuestOnly = ({children}: GuestOnlyProps) => {
  const {user, authChecked} = useUser();
  const router = useRouter();

  useEffect(()=>{
    if(authChecked && user !==  null){
      router.replace("/profile")
    }
  }, [user, authChecked])

  if(!authChecked || user) {
    return (
      <ThemedLoader />
    )
  }

  return children

}

export default GuestOnly;