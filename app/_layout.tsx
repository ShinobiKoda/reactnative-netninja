import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../contexts/userContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  console.log(colorScheme);

  return (
    <UserProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.navBackground,
            },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(dashboard)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
