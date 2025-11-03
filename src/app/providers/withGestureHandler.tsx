import React, { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const withGestureHandler = (Component: ReactNode) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    {Component}
  </GestureHandlerRootView>
);

export default withGestureHandler;
