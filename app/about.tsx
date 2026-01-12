import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";

const AboutPage = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={styles.title}>About Page</Text>

      <Link href="/" style={styles.link}>
        Back Home
      </Link>
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
  },

  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
