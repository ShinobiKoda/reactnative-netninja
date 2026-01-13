// components/ThemedSafeAreaView.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import {type ReactNode} from "react";

type ThemedSafeAreaViewProps= {
  children: ReactNode;
}

const ThemedSafeAreaView = ({ children }: ThemedSafeAreaViewProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemedSafeAreaView;
