import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";

import { useRouter } from "expo-router";

import { useBooks } from "../../hooks/useBooks";

const Create = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { createBook } = useBooks();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);

    await createBook({ title, author, description });

    setTitle("");
    setAuthor("");
    setDescription("");

    router.replace("/books");

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <Spacer />

        <ThemedText title={true} style={styles.title}>
          Add a new Book
        </ThemedText>

        <ThemedTextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />
        <ThemedTextInput
          style={styles.input}
          placeholder="Book Author"
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer />
        <ThemedTextInput
          style={styles.multiline}
          placeholder="Book Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "#fff" }}>
            {loading ? "Saving..." : "Create Book"}
          </Text>
        </ThemedButton>

        <Spacer />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },

  input: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },

  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});
