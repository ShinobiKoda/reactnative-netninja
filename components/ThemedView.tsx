import {
  StyleSheet,
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

const styles = StyleSheet.create({});
