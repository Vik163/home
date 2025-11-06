import { FontFamily, FontSizes, FontWeights } from "@/shared/constants/fonts";
import { palette } from "@/shared/constants/theme/palette";
import { useStyles } from "@/shared/hooks/useStyles";
import { Styles } from "@/shared/types/styles";
import { Colors, Theme } from "@/shared/types/theme";
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
  const { styles, themeScheme } = useStyles(createStyles());

  return (
    <View style={styles.container}>
      <Font alignCenter textTransform="uppercase" family={FontFamily.SOFIA}>
        {title}
      </Font>
      <Font
        alignCenter
        style={styles.box}
        size={40}
        family={FontFamily.SOFIA}
        lineHeight={0.5}
      >
        {279}
      </Font>
    </View>
  );
};

const createStyles = (style?: Styles) => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      width: 160,
      height: 100,
      gap: 5,
    },
    box: {
      width: 130,
      borderColor: palette.black,
      borderWidth: 1,
      borderRadius: 10,
      height: 50,
      backgroundColor: theme.colors.background,
      shadowColor: palette.black,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.55,
      shadowRadius: 3.84,
      elevation: 3,
    },
    btn: {},
  });
};
