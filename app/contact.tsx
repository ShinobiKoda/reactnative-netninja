import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const ContactPage = () => {

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Page</Text>

      <Link href="/" style={styles.link}>Back Home</Link>
    </View>
  );
};

export default ContactPage;

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
    borderBottomWidth: 1
  }
});
