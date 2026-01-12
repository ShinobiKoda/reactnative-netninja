import { TextInput, useColorScheme, TextInputProps } from "react-native";
import { Colors } from "../constants/Colors";
import React from "react";

const ThemedTextInput = ({ style, ...props }: TextInputProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <TextInput
      {...props}
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
    />
  );
};

export default ThemedTextInput;
