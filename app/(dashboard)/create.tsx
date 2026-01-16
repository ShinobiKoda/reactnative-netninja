import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";

import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";

import { useRouter } from "expo-router";
import { useBooks } from "../../hooks/useBooks";
import ThemedSafeAreaView from "../../components/ThemedSafeAreView";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { createBook } = useBooks();

  const handleSubmit = async () => {
    // Prevent duplicate submissions and empty values
    if (loading) return;
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);
    try {
      await createBook({ title, author, description });

      setTitle("");
      setAuthor("");
      setDescription("");
      router.replace("/books");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedSafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
              <ThemedText title style={styles.title}>
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
                multiline
              />

              <Spacer />

              <ThemedButton onPress={handleSubmit} disabled={loading}>
                <Text style={{ color: "#fff" }}>
                  {loading ? "Saving..." : "Create Book"}
                </Text>
              </ThemedButton>
              <Spacer />
            </ScrollView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingBottom: 60, //
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  input: {
    padding: 20,
    borderRadius: 6,
    minHeight: 60,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 120,
  },
});
