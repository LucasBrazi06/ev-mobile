import React from "react";
import { StatusBar, Dimensions } from "react-native";
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/auth/Login";
import Eula from "./screens/auth/Eula/";
import RetrievePassword from "./screens/auth/RetrievePassword";
import SignUp from "./screens/auth/SignUp";
import Sidebar from "./screens/Sidebar";
import Sites from "./screens/Sites";
import SiteAreas from "./screens/SiteAreas";
import Chargers from "./screens/Chargers";
import ChargerDetails from "./screens/ChargerDetails/ChargerDetails";
import ConnectorDetails from "./screens/ChargerDetails/ConnectorDetails";
import ChartDetails from "./screens/ChargerDetails/ChartDetails";
import ChargerTab from "./screens/ChargerDetails/ChargerTab";
import NotificationManager from "./notification/NotificationManager";

// Get the Notification Scheduler
const _notificationManager = NotificationManager.getInstance();
// Initialize
_notificationManager.initialize();

// Charger Tab Navigation
const ChargerTabNavigator = createBottomTabNavigator(
  {
    ConnectorDetails: { screen: ConnectorDetails },
    ChartDetails: { screen: ChartDetails },
    ChargerDetails: { screen: ChargerDetails }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    initialRouteName: "ConnectorDetails",
    animationEnabled: true,
    backBehavior: "none",
    tabBarComponent: (props) => <ChargerTab {...props} />
  }
);

// Drawer Navigation
const AppDrawerNavigator = createDrawerNavigator(
  {
    Sites: { screen: (props) => {
      // Set the navigation to the notification
      _notificationManager.setNavigation(props.navigation);
      // Start
      _notificationManager.start();
      // Return the sites
      return (<Sites {...props} />);
    }},
    SiteAreas: { screen: SiteAreas },
    Chargers: { screen: Chargers },
    ChargerTabNavigator: ChargerTabNavigator
  },
  {
    navigationOptions: {
      swipeEnabled: true,
    },
    drawerWidth: Dimensions.get("window").width / 1.5,
    initialRouteName: "Sites",
    drawerPosition: "right",
    contentComponent: (props) => <Sidebar {...props} />
  }
);

// Stack Navigation
const AuthNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Eula: { screen: Eula },
    SignUp: { screen: SignUp },
    RetrievePassword: { screen: RetrievePassword },
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const RootNavigator = createSwitchNavigator(
  {
    AuthNavigator: AuthNavigator,
    AppDrawerNavigator: AppDrawerNavigator,
  },
  {
    initialRouteName: "AuthNavigator",
  }
);

export default class App extends React.Component {
  async componentDidMount() {
    // Activate
    _notificationManager.setActive(true);
  }

  async componentWillUnmount() {
    // Deactivate
    this._notificationManager.setActive(false);
  }

  render() {
    return (
      <Root>
        <StatusBar hidden/>
        <RootNavigator/>
      </Root>
    );
  }
}

