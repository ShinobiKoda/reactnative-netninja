import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen name="profile" options={{title: "Profile"}}/>
        <Tabs.Screen name="create" options={{title: "Create"}}/>
        <Tabs.Screen name="Books" options={{title: "Books"}}/>
      </Tabs>
    </>
  );
}
