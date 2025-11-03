import compose from "compose-function";
import withGestureHandler from "./withGestureHandler";
import withPersister from "./withPersister";
import withRedux from "./withRedux";
import withSafeArea from "./withSafeArea";
import withTheme from "./withTheme";

const withProviders = compose(
  withRedux,
  withPersister,
  withTheme,
  withSafeArea,
  withGestureHandler
);

export default withProviders;
