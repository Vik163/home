import { palette } from "@/shared/constants/theme/palette";
import { useEffectAfterMount } from "@/shared/hooks/useEffectMount";
import { useTheme } from "@/shared/hooks/useTheme";
import { Font } from "@/shared/ui";
import { useState } from "react";
import Switch from "react-native-switch-toggles";

export const SwitchTheme = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  let { toggleTheme, themeScheme } = useTheme();

  useEffectAfterMount(() => {
    toggleTheme((newTheme) => {
      // setUserSettings({
      //   userId,
      //   userSettings: {
      //     ...userSettings,
      //     theme: newTheme,
      //   },
      // });
    });
  }, [isEnabled]);

  return (
    <>
      <Font>{isEnabled ? "Тёмный" : "Светлый"}</Font>
      <Switch
        size={40}
        value={isEnabled}
        onChange={setIsEnabled}
        activeThumbColor={palette.black}
        inactiveThumbColor={palette.lightBlue}
        activeTrackColor={palette.codGray}
        inactiveTrackColor={palette.codGray}
        renderInactiveThumbIcon={() => (
          <Font style={{ fontSize: 14, color: "black" }}>☀️</Font>
        )}
        renderActiveThumbIcon={() => (
          <Font style={{ fontSize: 14, color: "black" }}>🌙</Font>
        )}
      />
    </>
  );
};
