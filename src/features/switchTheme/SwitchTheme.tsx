import { useEffectAfterMount } from "@/shared/hooks/useEffectAfterMount";
import { useTheme } from "@/shared/hooks/useTheme";
import { useState } from "react";
import { Text } from "react-native";
import Switch from "react-native-switch-toggles";

export const SwitchTheme = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  let { toggleTheme } = useTheme();

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
      <Text>{isEnabled ? "Тёмный" : "Светлый"}</Text>
      <Switch
        size={60}
        value={isEnabled}
        onChange={setIsEnabled}
        activeThumbColor={"#f9ca24"}
        inactiveThumbColor={"#6ab04c"}
        activeTrackColor={"#6ab04c"}
        inactiveTrackColor={"#ffffff"}
        renderInactiveThumbIcon={() => (
          <Text style={{ fontSize: 14, color: "black" }}>☀️</Text>
        )}
        renderActiveThumbIcon={() => (
          <Text style={{ fontSize: 14, color: "black" }}>🌙</Text>
        )}
      />
    </>
  );
};
