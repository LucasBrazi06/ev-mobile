import { Icon, Thumbnail } from 'native-base';
import React from 'react';
import { ImageStyle, Text, View } from 'react-native';
import BaseProps from '../../types/BaseProps';
import Car from '../../types/Car';
import Utils from '../../utils/Utils';
import UserAvatar from '../user/avatar/UserAvatar';
import computeStyleSheet from './CarComponentStyle';

interface State {
}

export interface Props extends BaseProps {
  car: Car;
  selected: boolean;
}

export default class CarComponent extends React.Component<Props, State> {
  public props: Props;
  public state: State;

  public constructor(props: Props) {
    super(props);
  }

  public setState = (state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, never>) | Pick<State, never>, callback?: () => void) => {
    super.setState(state, callback);
  }

  private renderNoUser(style: any) {
    const { navigation } = this.props;
    return (
      <View style={style.userContainer}>
        <View style={style.avatarContainer}>
          <UserAvatar small={true} navigation={navigation}/>
        </View>
        <Text style={style.userName}>-</Text>
      </View>
    );
  }

  public render() {
    const style = computeStyleSheet();
    const { car, selected, navigation } = this.props;
    const carUsers = car?.carUsers ? car.carUsers : [];
    const defaultCarUser = carUsers.length === 1 ? carUsers[0] : carUsers?.find((userCar) => userCar.default === true);
    const otherUserCount = Math.max(carUsers.length - 1, 0);
    const carFullName = car?.carCatalog?.vehicleMake + ' ' + car?.carCatalog?.vehicleModel + ' ' + car.carCatalog?.vehicleModelVersion;
    return (
      <View style={selected ? [style.container, style.selected] : style.container}>
        <View style={style.header}>
          <View style={style.carNameContainer}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={style.headerText}>{carFullName}</Text>
          </View>
          <View style={style.licensePlateContainer}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={style.headerText}>{car.licensePlate}</Text>
          </View>
        </View>
        <View/>
        <View style={style.carContent}>
          <View style={style.carInfos}>
            {defaultCarUser ?
              <View style={style.userContainer}>
                <View style={style.avatarContainer}>
                  <UserAvatar small={true} user={defaultCarUser.user} navigation={navigation}/>
                </View>
                <View style={style.userNameContainer}>
                  <Text numberOfLines={1} ellipsizeMode={'tail'} style={style.text}>{Utils.buildUserName(defaultCarUser.user)}</Text>
                  {(otherUserCount > 0) && <Text style={style.text}> (+{otherUserCount})</Text>}
                </View>
              </View>
              :
              this.renderNoUser(style)
              }
            <View style={style.powerDetailsContainer}>
              <View style={style.column}>
                <Icon type='MaterialIcons' name='battery-full' style={style.icon}/>
                <Text numberOfLines={2} ellipsizeMode={'tail'} style={style.text}>{car.carCatalog?.batteryCapacityFull} kWh</Text>
              </View>
              <View style={style.column}>
                <View style={style.iconContainer}>
                  <Icon style={style.icon} type='MaterialIcons' name='bolt'/>
                  <Icon style={style.currentTypeIcon} type='MaterialIcons' name='power-input'/>
                </View>
                {car?.carCatalog?.fastChargePowerMax ?
                  <Text numberOfLines={2} style={style.text}>{car?.carCatalog?.fastChargePowerMax} kW</Text>
                  :
                  <Text style={style.text}>-</Text>}
              </View>
              <View style={style.column}>
                <View style={style.iconContainer}>
                  <Icon style={style.icon} type='MaterialIcons' name='bolt'/>
                  <Icon style={style.currentTypeIcon} type='MaterialCommunityIcons' name='sine-wave'/>
                </View>
                <Text numberOfLines={2} style={style.text}>{car?.converter?.powerWatts} kW ({car?.converter?.numberOfPhases})</Text>
              </View>
            </View>
          </View>
          <Thumbnail square={true} style={style.imageStyle as ImageStyle} source={{uri: car?.carCatalog?.image}}/>
        </View>
        <View/>
      </View>
    );
  }
}