import React, { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const withSafeArea = (Component: ReactNode) => (
  <SafeAreaProvider>{Component}</SafeAreaProvider>
);

export default withSafeArea;
