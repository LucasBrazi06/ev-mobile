import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Container } from "native-base";

import { VictoryChart, VictoryTheme, VictoryArea, VictoryAxis } from "victory-native";

import ProviderFactory from "../../../provider/ProviderFactory";
import Utils from "../../../utils/Utils";
import Constants from "../../../utils/Constants";
import I18n from "../../../I18n/I18n";
import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const _provider = ProviderFactory.getProvider();
const emptyChart = [{x:0, y:0}, {x:1, y:0}];

class ChartDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charger: this.props.navigation.state.params.charger,
      connector: this.props.navigation.state.params.connector,
      values: null,
      valuesToDisplay: emptyChart
    };
  }

  async componentDidMount() {
    // Get the consumption
    await this.getChargingStationConsumption();
  }

  async componentWillUnmount() {
    // Clear interval if it exists
    if (this.timerChartData) {
      clearInterval(this.timerChartData);
    }
  }

  getChargingStationConsumption = async () => {
    try {
      // Active Transaction?
      if (this.state.connector.activeTransactionID) {
        // Clear interval if it exists
        if (!this.timerChartData) {
          // Start refreshing Charger Data
          this.timerChartData = setInterval(() => {
            // Refresh Consumption
            this.getChargingStationConsumption();
          }, Constants.AUTO_REFRESH_CHART_PERIOD_MILLIS);
        }
        // Get the consumption
        let result = await _provider.getChargingStationConsumption({
          TransactionId: this.state.connector.activeTransactionID
        });
        // Test
        let resultOld = {
          "chargeBoxID":"SAP-Mougins-07",
          "connectorId":2,
          "priceUnit":"EUR",
          "totalPrice":2.635154,
          "totalConsumption":21200,
          "id":1822357677,
          "user":{
             "id":"59f03dc7f2c8c0ed9ed36c8c",
             "name":"MOUELHI",
             "firstName":"Aymen"
          },
          "values":[
             {
                "date":"2018-12-07T13:08:24.000Z",
                "value":10920,
                "cumulated":182,
                "price":0.022623
             },
             {
                "date":"2018-12-07T13:09:24.000Z",
                "value":16320,
                "cumulated":454,
                "price":0.03381
             },
             {
                "date":"2018-12-07T13:10:24.000Z",
                "value":16380,
                "cumulated":727,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:11:24.000Z",
                "value":16380,
                "cumulated":1000,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:12:24.000Z",
                "value":16380,
                "cumulated":1273,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:13:24.000Z",
                "value":16380,
                "cumulated":1546,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:14:24.000Z",
                "value":16380,
                "cumulated":1819,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:15:24.000Z",
                "value":16380,
                "cumulated":2092,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:16:24.000Z",
                "value":16440,
                "cumulated":2366,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:17:24.000Z",
                "value":16440,
                "cumulated":2640,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:18:24.000Z",
                "value":16440,
                "cumulated":2914,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:19:24.000Z",
                "value":16380,
                "cumulated":3187,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:20:24.000Z",
                "value":16440,
                "cumulated":3461,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:21:24.000Z",
                "value":16440,
                "cumulated":3735,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:22:24.000Z",
                "value":16440,
                "cumulated":4009,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:23:24.000Z",
                "value":16380,
                "cumulated":4282,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:24:24.000Z",
                "value":16440,
                "cumulated":4556,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:25:24.000Z",
                "value":16440,
                "cumulated":4830,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:26:24.000Z",
                "value":16440,
                "cumulated":5104,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:27:24.000Z",
                "value":16440,
                "cumulated":5378,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:28:24.000Z",
                "value":16380,
                "cumulated":5651,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:29:24.000Z",
                "value":16440,
                "cumulated":5925,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:30:24.000Z",
                "value":16440,
                "cumulated":6199,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:31:24.000Z",
                "value":16440,
                "cumulated":6473,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:32:24.000Z",
                "value":16440,
                "cumulated":6747,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:33:24.000Z",
                "value":16380,
                "cumulated":7020,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:34:24.000Z",
                "value":16440,
                "cumulated":7294,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:35:24.000Z",
                "value":16440,
                "cumulated":7568,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:36:24.000Z",
                "value":16440,
                "cumulated":7842,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:37:24.000Z",
                "value":16440,
                "cumulated":8116,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:38:24.000Z",
                "value":16440,
                "cumulated":8390,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:39:24.000Z",
                "value":16440,
                "cumulated":8664,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:40:24.000Z",
                "value":16440,
                "cumulated":8938,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:41:24.000Z",
                "value":16440,
                "cumulated":9212,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:42:24.000Z",
                "value":16380,
                "cumulated":9485,
                "price":0.033934
             },
             {
                "date":"2018-12-07T13:43:24.000Z",
                "value":16440,
                "cumulated":9759,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:44:24.000Z",
                "value":16440,
                "cumulated":10033,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:45:24.000Z",
                "value":16440,
                "cumulated":10307,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:46:24.000Z",
                "value":16440,
                "cumulated":10581,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:47:24.000Z",
                "value":16440,
                "cumulated":10855,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:48:24.000Z",
                "value":16440,
                "cumulated":11129,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:49:24.000Z",
                "value":16440,
                "cumulated":11403,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:50:24.000Z",
                "value":16440,
                "cumulated":11677,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:51:24.000Z",
                "value":16440,
                "cumulated":11951,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:52:24.000Z",
                "value":16440,
                "cumulated":12225,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:53:24.000Z",
                "value":16440,
                "cumulated":12499,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:54:24.000Z",
                "value":16440,
                "cumulated":12773,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:55:24.000Z",
                "value":16440,
                "cumulated":13047,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:56:24.000Z",
                "value":16500,
                "cumulated":13322,
                "price":0.034182
             },
             {
                "date":"2018-12-07T13:57:24.000Z",
                "value":16440,
                "cumulated":13596,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:58:24.000Z",
                "value":16440,
                "cumulated":13870,
                "price":0.034058
             },
             {
                "date":"2018-12-07T13:59:24.000Z",
                "value":16440,
                "cumulated":14144,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:00:24.000Z",
                "value":16440,
                "cumulated":14418,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:01:24.000Z",
                "value":16440,
                "cumulated":14692,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:02:24.000Z",
                "value":16440,
                "cumulated":14966,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:03:24.000Z",
                "value":16440,
                "cumulated":15240,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:04:24.000Z",
                "value":16440,
                "cumulated":15514,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:05:24.000Z",
                "value":16500,
                "cumulated":15789,
                "price":0.034182
             },
             {
                "date":"2018-12-07T14:06:24.000Z",
                "value":16440,
                "cumulated":16063,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:07:24.000Z",
                "value":16440,
                "cumulated":16337,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:08:24.000Z",
                "value":16440,
                "cumulated":16611,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:09:24.000Z",
                "value":16440,
                "cumulated":16885,
                "price":0.034058
             },
             {
                "date":"2018-12-07T14:10:24.000Z",
                "value":16080,
                "cumulated":17153,
                "price":0.033312
             },
             {
                "date":"2018-12-07T14:11:24.000Z",
                "value":14820,
                "cumulated":17400,
                "price":0.030702
             },
             {
                "date":"2018-12-07T14:12:24.000Z",
                "value":13860,
                "cumulated":17631,
                "price":0.028713
             },
             {
                "date":"2018-12-07T14:13:24.000Z",
                "value":12960,
                "cumulated":17847,
                "price":0.026849
             },
             {
                "date":"2018-12-07T14:14:24.000Z",
                "value":12180,
                "cumulated":18050,
                "price":0.025233
             },
             {
                "date":"2018-12-07T14:15:24.000Z",
                "value":11400,
                "cumulated":18240,
                "price":0.023617
             },
             {
                "date":"2018-12-07T14:16:24.000Z",
                "value":10740,
                "cumulated":18419,
                "price":0.02225
             },
             {
                "date":"2018-12-07T14:17:24.000Z",
                "value":10020,
                "cumulated":18586,
                "price":0.020758
             },
             {
                "date":"2018-12-07T14:18:24.000Z",
                "value":9420,
                "cumulated":18743,
                "price":0.019515
             },
             {
                "date":"2018-12-07T14:19:24.000Z",
                "value":8880,
                "cumulated":18891,
                "price":0.018396
             },
             {
                "date":"2018-12-07T14:20:24.000Z",
                "value":8340,
                "cumulated":19030,
                "price":0.017278
             },
             {
                "date":"2018-12-07T14:21:24.000Z",
                "value":7800,
                "cumulated":19160,
                "price":0.016159
             },
             {
                "date":"2018-12-07T14:22:24.000Z",
                "value":7320,
                "cumulated":19282,
                "price":0.015165
             },
             {
                "date":"2018-12-07T14:23:24.000Z",
                "value":6960,
                "cumulated":19398,
                "price":0.014419
             },
             {
                "date":"2018-12-07T14:24:24.000Z",
                "value":6600,
                "cumulated":19508,
                "price":0.013673
             },
             {
                "date":"2018-12-07T14:25:24.000Z",
                "value":6240,
                "cumulated":19612,
                "price":0.012927
             },
             {
                "date":"2018-12-07T14:26:24.000Z",
                "value":5820,
                "cumulated":19709,
                "price":0.012057
             },
             {
                "date":"2018-12-07T14:27:24.000Z",
                "value":5520,
                "cumulated":19801,
                "price":0.011436
             },
             {
                "date":"2018-12-07T14:28:24.000Z",
                "value":5160,
                "cumulated":19887,
                "price":0.01069
             },
             {
                "date":"2018-12-07T14:29:24.000Z",
                "value":4920,
                "cumulated":19969,
                "price":0.010193
             },
             {
                "date":"2018-12-07T14:30:24.000Z",
                "value":4560,
                "cumulated":20045,
                "price":0.009447
             },
             {
                "date":"2018-12-07T14:31:24.000Z",
                "value":4320,
                "cumulated":20117,
                "price":0.00895
             },
             {
                "date":"2018-12-07T14:32:24.000Z",
                "value":4080,
                "cumulated":20185,
                "price":0.008452
             },
             {
                "date":"2018-12-07T14:33:24.000Z",
                "value":3840,
                "cumulated":20249,
                "price":0.007955
             },
             {
                "date":"2018-12-07T14:34:24.000Z",
                "value":3600,
                "cumulated":20309,
                "price":0.007458
             },
             {
                "date":"2018-12-07T14:35:24.000Z",
                "value":3420,
                "cumulated":20366,
                "price":0.007085
             },
             {
                "date":"2018-12-07T14:36:24.000Z",
                "value":3240,
                "cumulated":20420,
                "price":0.006712
             },
             {
                "date":"2018-12-07T14:37:24.000Z",
                "value":3120,
                "cumulated":20472,
                "price":0.006464
             },
             {
                "date":"2018-12-07T14:38:24.000Z",
                "value":3000,
                "cumulated":20522,
                "price":0.006215
             },
             {
                "date":"2018-12-07T14:39:24.000Z",
                "value":2820,
                "cumulated":20569,
                "price":0.005842
             },
             {
                "date":"2018-12-07T14:40:24.000Z",
                "value":2700,
                "cumulated":20614,
                "price":0.005593
             },
             {
                "date":"2018-12-07T14:41:24.000Z",
                "value":2580,
                "cumulated":20657,
                "price":0.005345
             },
             {
                "date":"2018-12-07T14:42:24.000Z",
                "value":2400,
                "cumulated":20697,
                "price":0.004972
             },
             {
                "date":"2018-12-07T14:43:24.000Z",
                "value":2340,
                "cumulated":20736,
                "price":0.004848
             },
             {
                "date":"2018-12-07T14:44:24.000Z",
                "value":2220,
                "cumulated":20773,
                "price":0.004599
             },
             {
                "date":"2018-12-07T14:45:24.000Z",
                "value":2100,
                "cumulated":20808,
                "price":0.004351
             },
             {
                "date":"2018-12-07T14:46:24.000Z",
                "value":2040,
                "cumulated":20842,
                "price":0.004226
             },
             {
                "date":"2018-12-07T14:47:24.000Z",
                "value":1920,
                "cumulated":20874,
                "price":0.003978
             },
             {
                "date":"2018-12-07T14:48:24.000Z",
                "value":1860,
                "cumulated":20905,
                "price":0.003853
             },
             {
                "date":"2018-12-07T14:49:24.000Z",
                "value":1740,
                "cumulated":20934,
                "price":0.003605
             },
             {
                "date":"2018-12-07T14:50:24.000Z",
                "value":1740,
                "cumulated":20963,
                "price":0.003605
             },
             {
                "date":"2018-12-07T14:51:24.000Z",
                "value":1620,
                "cumulated":20990,
                "price":0.003356
             },
             {
                "date":"2018-12-07T14:52:24.000Z",
                "value":1560,
                "cumulated":21016,
                "price":0.003232
             },
             {
                "date":"2018-12-07T14:53:24.000Z",
                "value":1560,
                "cumulated":21042,
                "price":0.003232
             },
             {
                "date":"2018-12-07T14:54:24.000Z",
                "value":1440,
                "cumulated":21066,
                "price":0.002983
             },
             {
                "date":"2018-12-07T14:55:24.000Z",
                "value":1440,
                "cumulated":21090,
                "price":0.002983
             },
             {
                "date":"2018-12-07T14:56:24.000Z",
                "value":1320,
                "cumulated":21112,
                "price":0.002735
             },
             {
                "date":"2018-12-07T14:57:24.000Z",
                "value":1320,
                "cumulated":21134,
                "price":0.002735
             },
             {
                "date":"2018-12-07T14:58:24.000Z",
                "value":1320,
                "cumulated":21156,
                "price":0.002735
             },
             {
                "date":"2018-12-07T14:59:24.000Z",
                "value":1200,
                "cumulated":21176,
                "price":0.002486
             },
             {
                "date":"2018-12-07T15:00:24.000Z",
                "value":1200,
                "cumulated":21196,
                "price":0.002486
             },
             {
                "date":"2018-12-07T15:01:24.000Z",
                "value":240,
                "cumulated":21200,
                "price":0.000497
             },
             {
                "date":"2018-12-07T15:02:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:03:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:04:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:05:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:06:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:07:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:08:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:09:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:10:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:11:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:12:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:13:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:14:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:15:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:16:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:17:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:18:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:19:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:20:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:21:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:22:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:23:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:24:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:25:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:26:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:27:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:28:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:29:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:30:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:31:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:32:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:33:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:34:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:35:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:36:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:37:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:38:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:39:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:40:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:41:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:42:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:43:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:44:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:45:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:46:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:47:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:48:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:49:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:50:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:51:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:52:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:53:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:54:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:55:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:56:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:57:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:58:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T15:59:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:00:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:01:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:02:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:03:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:04:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:05:24.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             },
             {
                "date":"2018-12-07T16:05:42.000Z",
                "value":0,
                "cumulated":21200,
                "price":0
             }
          ]
        };
        // Convert
        const valuesToDisplay = result.values.map((value, index) => { return {x: index, y: value.value} });
        // Set
        this.setState({
          values: result.values,
          valuesToDisplay : valuesToDisplay
        });
      } else {
        // Clear interval
        if (this.timerChartData) {
          clearInterval(this.timerChartData);
        }
        // Clear
        this.setState({
          values: null,
          valuesToDisplay: emptyChart
        });
      }
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  render() {
    const { dataToDisplay, xCategory, connector } = this.state;
    return (
      <Container>
        <VictoryChart theme={VictoryTheme.material} width={deviceHeight} padding={styles.padding} domain={{y: [0, (connector.power)]}}>
          <VictoryArea
            style={{ data: { fill: "cyan", stroke: "cyan" } }}
            data={this.state.valuesToDisplay}
          />
          <VictoryAxis label={I18n.t("details.time")} style={{axisLabel: styles.xAxisLabel}} />
          <VictoryAxis dependentAxis label={I18n.t("details.chargeInWatts")} style={{axisLabel: styles.yAxisLabel}} />
        </VictoryChart>
      </Container>
    );
  }
}

export default ChartDetails;
