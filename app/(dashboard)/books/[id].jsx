import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import { useRouter, useLocalSearchParams } from "expo-router";

import ThemedSafeAreaView from "../../../components/ThemedSafeAreView";
import ThemedText from "../../../components/ThemedText";
import ThemedCard from "../../../components/ThemedCard";
import { useBooks } from "../../../hooks/useBooks";
import Spacer from "../../../components/Spacer";
import ThemedLoader from "../../../components/ThemedLoader";
import ThemedButton from "../../../components/ThemedButton";
import { Colors } from "../../../constants/Colors";

const BookDetails = () => {
  const { fetchBookById, deleteBook } = useBooks();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const { id } = useLocalSearchParams();

  const handleDelete = async() => {
    await deleteBook(id)
    setBook(null);
    router.replace("/books")
  }

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
      <ThemedButton onPress={handleDelete} style={styles.delete}>
        <Text style={{color: "#fff", textAlign: "center"}}>Delete Book</Text>
      </ThemedButton>
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
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",

  }
});
