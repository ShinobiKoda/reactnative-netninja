import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { Colors } from "../constants/Colors";

type ThemedButtonProps = Omit<PressableProps, "style"> & {
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
};

function ThemedButton({ style, ...props }: ThemedButtonProps) {
  return (
    <Pressable
      style={(state) => [
        styles.btn,
        state.pressed && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ThemedButton;
