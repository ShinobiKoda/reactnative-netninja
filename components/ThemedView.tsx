import {
  StyleSheet,
  View,
  useColorScheme,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../constants/Colors";
import React from "react";

interface ThemedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  safe: boolean;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  children,
  safe=false,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  if (!safe)
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

    const insets = useSafeAreaInsets();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
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
