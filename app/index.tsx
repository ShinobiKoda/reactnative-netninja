import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {Link} from "expo-router"

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/favicon.png")}
        style={styles.image}
      />

      <Text style={styles.title}>List</Text>
      <Text style={{ marginTop: 10, marginBottom: 30 }}>Reading List App</Text>

      <View style={styles.card}>
        <Text>Hello this is a card.</Text>
      </View>

      <Link href="/about" style={styles.link}>About Page</Link>
      <Link href="/contact" style={styles.link}>Contact Page</Link>
    </View>
  );
};

export default Home;

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

  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  image: {
    marginVertical: 20,
  },

   link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
});
