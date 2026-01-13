import {
  View,
  useColorScheme,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";
import { Colors } from "../constants/Colors";
import React from "react";

interface ThemedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  children,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      {...rest}
      style={[
        {
          flex: 1, // 👈 critical
          backgroundColor: theme.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ThemedView;
