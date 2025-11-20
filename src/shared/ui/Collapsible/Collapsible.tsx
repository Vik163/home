import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@/shared/constants/theme/theme";
import { useTheme } from "@/shared/hooks/useTheme";
import { ThemedView } from "@/shared/lib/themed-view";
import { IconSymbol } from "@/shared/ui/IconSymbol/icon-symbol";
import { Font } from "../Font/Font";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { themeScheme } = useTheme();

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={themeScheme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <Font>{title}</Font>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
