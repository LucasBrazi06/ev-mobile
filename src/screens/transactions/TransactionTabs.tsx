import { Icon, Tab, TabHeading, Tabs } from "native-base";
import React from "react";
import { Alert, BackHandler, ScrollView } from "react-native";
import BackgroundComponent from "../../components/background/BackgroundComponent";
import I18n from "../../I18n/I18n";
import BaseProps from "../../types/BaseProps";
import BaseAutoRefreshScreen from "../base-screen/BaseAutoRefreshScreen";
import TransactionsHistory from "./history/TransactionsHistory";
import TransactionsInProgress from "./in-progress/TransactionsInProgress";
import computeStyleSheet from "./TransactionTabsStyles";

export interface Props extends BaseProps {
}

interface State {
}

export default class TransactionTabs extends BaseAutoRefreshScreen<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  public setState = (state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, never>) | Pick<State, never>, callback?: () => void) => {
    super.setState(state, callback);
  }

  public async componentDidMount() {
    // Call parent
    await super.componentDidMount();
    // Load Transactions
    await this.refresh();
  }

  public onBack = (): boolean => {
    // Exit?
    Alert.alert(
      I18n.t("general.exitApp"),
      I18n.t("general.exitAppConfirm"),
      [{ text: I18n.t("general.no"), style: "cancel" }, { text: I18n.t("general.yes"), onPress: () => BackHandler.exitApp() }],
      { cancelable: false }
    );
    // Do not bubble up
    return true;
  };

  public refresh = async () => {
    if (this.isMounted()) {
      // Refresh Admin
      const securityProvider = this.centralServerProvider.getSecurityProvider();
      this.setState({
        firstLoad: false,
        isAdmin: securityProvider ? securityProvider.isAdmin() : false
      });
    }
  };

  public render() {
    const style = computeStyleSheet();
    const { navigation } = this.props;
    return (
      <ScrollView contentContainerStyle={style.container}>
        <BackgroundComponent navigation={navigation} active={false}>
          <Tabs tabBarPosition="bottom" locked={false} initialPage={0}>
            <Tab
              heading={
                <TabHeading style={style.tabHeader}>
                  <Icon style={style.tabIcon} type="FontAwesome" name="bolt" />
                </TabHeading>
              }>
              <TransactionsInProgress navigation={navigation} />
            </Tab>
            <Tab
              heading={
                <TabHeading style={style.tabHeader}>
                  <Icon style={style.tabIcon} type="MaterialIcons" name="history" />
                </TabHeading>
              }>
              <TransactionsHistory navigation={navigation} />
            </Tab>
          </Tabs>
        </BackgroundComponent>
      </ScrollView>
    );
  }
}