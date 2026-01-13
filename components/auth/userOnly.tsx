import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { type ReactNode } from "react";
import { Text } from "react-native";

type UserOnlyProps = { children: ReactNode };


const UserOnly = ({children}: UserOnlyProps) => {
  const {user, authChecked} = useUser();
  const router = useRouter();

  useEffect(()=>{
    if(authChecked && user ===  null){
      router.replace("/login")
    }
  }, [user, authChecked])

  if(!authChecked || !user) {
    return (
      <Text>Loading..</Text>
    )
  }

  return children

}

export default UserOnly;