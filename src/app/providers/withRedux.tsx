import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

const withRedux = (Component: ReactNode) => (
  <Provider store={store}>{Component}</Provider>
);

export default withRedux;
