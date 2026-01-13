import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import { useLocalSearchParams } from "expo-router";

import ThemedSafeAreaView from "../../../components/ThemedSafeAreView";
import ThemedText from "../../../components/ThemedText";
import ThemedCard from "../../../components/ThemedCard";
import { useBooks } from "../../../hooks/useBooks";
import Spacer from "../../../components/Spacer";
import ThemedLoader from "../../../components/ThemedLoader";

const BookDetails = () => {
  const { fetchBookById } = useBooks();

  const [book, setBook] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const loadBook = async () => {
      const bookData = await fetchBookById(id);
      setBook(bookData);
    };
    loadBook();
  }, [id]);

  if (!book) {
    return (
      <ThemedSafeAreaView style={styles.container}>
        <ThemedLoader></ThemedLoader>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written by {book.author}</ThemedText>
        <Spacer />
        <ThemedText title={true}>Book Description: </ThemedText>
        <Spacer height={10} />
        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>
    </ThemedSafeAreaView>
  ); 
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10
  },
  card: {
    margin: 20,
    padding: 20
  }
});
