import React, { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";

const withPersister = (Component: ReactNode) => (
  <PersistGate loading={null} persistor={persistor}>
    {Component}
  </PersistGate>
);

export default withPersister;
