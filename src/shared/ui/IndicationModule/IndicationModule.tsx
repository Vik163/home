import { FontFamily, FontSizes, FontWeights } from "@/shared/constants/fonts";
import { palette } from "@/shared/constants/theme/palette";
import { useStyles } from "@/shared/hooks/useStyles";
import { Styles } from "@/shared/types/styles";
import { Colors, Theme } from "@/shared/types/theme";
import { StyleSheet, View } from "react-native";
import { Font } from "../Font/Font";

interface IndicationModuleProps {
  title: string;
  value: string;
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
  const { title, value } = props;
  const { styles } = useStyles(createStyles());

  return (
    <View style={styles.container}>
      <Font alignCenter size={16} family={FontFamily.SOFIA}>
        {title}
      </Font>
      <Font
        alignCenter
        style={styles.box}
        size={40}
        family={FontFamily.SOFIA}
        lineHeight={0.9}
      >
        {value}
      </Font>
    </View>
  );
};

const createStyles = (style?: Styles) => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: "center",
      width: 150,
      height: 86,
      gap: 5,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      paddingTop: 5,
    },
    box: {
      width: 140,
      borderColor: theme.colors.border,
      borderWidth: 2,
      borderRadius: 10,
      height: 50,
      backgroundColor: theme.colors.background,
      shadowColor: palette.black,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.95,
      shadowRadius: 3.84,
      elevation: 5,
    },
    btn: {},
  });
};
