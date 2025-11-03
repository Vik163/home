import compose from "compose-function";
import withGestureHandler from "./withGestureHandler";
import withPersister from "./withPersister";
import withRedux from "./withRedux";
import withSafeArea from "./withSafeArea";

const withProviders = compose(
  withRedux,
  withPersister,
  withSafeArea,
  withGestureHandler
);

export default withProviders;
