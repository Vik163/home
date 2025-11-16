import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { NavigatorRoutes, ScreenRoutes } from "../config/routing";

export function useNavigationActions() {
  const navigation = useNavigation<AppNavigation.NavigationProps>();

  function goToMain() {
    navigation.dispatch(StackActions.replace(ScreenRoutes.Main));
  }

  function goToLogin() {
    navigation.dispatch(StackActions.replace(NavigatorRoutes.Login));
  }

  function resetMain() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: NavigatorRoutes.Home,
            state: {
              routes: [
                {
                  name: NavigatorRoutes.Home,
                },
              ],
            },
          },
        ],
      })
    );
  }

  return {
    goToMain,
    resetMain,
    goToLogin,
    goTo: navigation.navigate,
    goBack: navigation.goBack,
  };
}
