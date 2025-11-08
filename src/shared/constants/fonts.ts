import { Platform } from "react-native";
import { fluidType } from "../lib/fluidLayout";

export enum FontFamily {
  SOFIA = "SofiaSans",
  ALEGRIA = "Alegreya",
}

export enum FontWeights {
  BLACK = 900,
  MEDIUM = 500,
  BOLD = 700,
}
const xxSmall = fluidType({ min: 10, max: 12 });
const xSmall = fluidType({ min: 12, max: 14 });
const small = fluidType({ min: 14, max: 16 });
const medium = fluidType({ min: 16, max: 18 });
const large = fluidType({ min: 20, max: 22 });
const xLarge = fluidType({ min: 24, max: 26 });
const xxLarge = fluidType({ min: 32, max: 34 });

export enum FontSizes {
  XXSMALL = xxSmall,
  XSMALL = xSmall,
  SMALL = small,
  MEDIUM = medium,
  LARGE = large,
  XLARGE = xLarge,
  XXLARGE = xxLarge,
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
