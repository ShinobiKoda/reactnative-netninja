import { Text, useColorScheme, TextProps } from "react-native";
import { Colors } from "../constants/Colors";

interface ThemedTextProps extends TextProps {
  title?: boolean;
}

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
