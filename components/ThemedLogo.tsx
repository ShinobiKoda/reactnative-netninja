import { Image, useColorScheme, ImageProps } from "react-native";

type ThemedLogoProps = Omit<ImageProps, "source">;

const ThemedLogo: React.FC<ThemedLogoProps> = ({ style, ...rest }) => {
  const colorScheme = useColorScheme();

  const logo =
    colorScheme === "dark"
      ? require("../assets/images/logo_dark.png")
      : require("../assets/images/logo_light.png");

  return <Image source={logo} style={style} {...rest} />;
};

export default ThemedLogo;
