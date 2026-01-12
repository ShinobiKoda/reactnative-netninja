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

interface ThemedCardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ThemedCard: React.FC<ThemedCardProps> = ({
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
          backgroundColor: theme.uiBackground,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20
  }
});
