import { FontFamily, FontSizes, FontWeights } from "@/shared/constants/fonts";
import { Colors } from "@/shared/types/theme";
import { StyleSheet, View } from "react-native";
import { Font } from "../Font/Font";

interface IndicationModuleProps {
  title: string;
  width?: number | string;
  height?: number | string;
  flex?: number;
  size?: FontSizes;
  weight?: FontWeights;
  lineHeight?: number;
  color?: Colors;
  multiline?: boolean;
}

export const IndicationModule = (props: IndicationModuleProps) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Font
        alignCenter
        textTransform="uppercase"
        family={FontFamily.ALEGRIA}
        style={styles.title}
      >
        {title}
      </Font>
      <Font
        alignCenter
        style={styles.box}
        size={36}
        family={FontFamily.ALEGRIA}
      >
        {2790}
      </Font>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#EB4C42",
    borderWidth: 1,
  },
  title: {
    borderColor: "#EB4C42",
    borderWidth: 1,
  },
  box: {
    borderColor: "#EB4C42",
    backgroundColor: "blue",
    borderWidth: 1,
    fontSize: 50,
  },
});
