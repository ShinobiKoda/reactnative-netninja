import { View } from "react-native";

type SpacerProps = {
  width?: number;
  height?: number;
};

const Spacer = ({ width, height = 40 }: SpacerProps) => {
  return (
    <View
      style={{
        height,
        width,
      }}
    />
  );
};

export default Spacer;
