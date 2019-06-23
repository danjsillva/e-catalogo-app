import { createAppContainer, createStackNavigator } from "react-navigation";

import Feed from "./pages/Feed";
import Sync from "./pages/Sync";

const Routes = createAppContainer(
  createStackNavigator({
    Feed,
    Sync
  })
);

export default Routes;
