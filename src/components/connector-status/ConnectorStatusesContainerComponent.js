import React from "react";
import PropTypes from "prop-types";
import { ResponsiveComponent } from "react-native-responsive-ui";
import computeStyleSheet from "./ConnectorStatusesContainerComponentStyles.js";
import { Text, View } from "native-base";
import I18n from "../../I18n/I18n";
import ConnectorStatusComponent from "./ConnectorStatusComponent";
import Constants from "../../utils/Constants";
import Utils from "../../utils/Utils";

const style = computeStyleSheet();

export default class ConnectorStatusesContainerComponent extends ResponsiveComponent {
  render() {
    return (
      <View style={style.container}>
        <ConnectorStatusComponent
          value={this.props.availableConnectors}
          text={Utils.translateConnectorStatus(Constants.CONN_STATUS_AVAILABLE)}
          type={Constants.CONN_STATUS_AVAILABLE}
        />
        <ConnectorStatusComponent
          value={this.props.totalConnectors - this.props.availableConnectors}
          text={Utils.translateConnectorStatus(Constants.CONN_STATUS_OCCUPIED)}
          type={Constants.CONN_STATUS_SUSPENDED_EVSE}
        />
        {/* <ConnectorStatusComponent
          value={this.props.totalConnectors - this.props.availableConnectors}
          text={Utils.translateConnectorStatus(Constants.CONN_STATUS_CHARGING)}
          type={Constants.CONN_STATUS_CHARGING}
        /> */}
      </View>
    );
  }
}

ConnectorStatusesContainerComponent.propTypes = {
  totalConnectors: PropTypes.number.isRequired,
  availableConnectors: PropTypes.number.isRequired,
};
