import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { useLocalSearchParams } from "expo-router";

import ThemedSafeAreaView from "../../../components/ThemedSafeAreView";
import ThemedText from "../../../components/ThemedText";


const BookDetails = () => {


  const {id} = useLocalSearchParams();



  return (
    <ThemedSafeAreaView>
      <ThemedText>Book Text - {id}</ThemedText>
    </ThemedSafeAreaView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
