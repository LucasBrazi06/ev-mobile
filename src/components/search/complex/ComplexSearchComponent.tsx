import I18n from 'i18n-js';
import { Button, Text, View } from 'native-base';
import React from 'react';
import Modal from 'react-native-modal';
import BaseProps from '../../../types/BaseProps';
import computeStyleSheet from './ComplexSearchComponentStyles';

export interface Props extends BaseProps {
  onFilterChanged?: (filters: any) => void;
  visible?: boolean;
}

interface State {
  visible?: boolean;
}

export default class ComplexSearchComponent extends React.Component<Props, State> {
  public state: State;
  public props: Props;
  private filters: any = {};
  public static defaultProps = {
    visible: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: props.visible ? props.visible : false
    };
  }

  public setState = (state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, never>) | Pick<State, never>, callback?: () => void) => {
    super.setState(state, callback);
  }

  public setVisible = (visible: boolean) => {
    this.setState({ visible });
  }

  public setFilter(ID: string, value: string) {
    this.filters[ID] = value;
  }

  public getFilter(ID: string): string {
    return this.filters[ID];
  }

  public getFilters(): any {
    return this.filters;
  }

  public closeFiltersAndTriggerEvent = () => {
    const { onFilterChanged } = this.props;
    let atLeastOneFilter = false;
    for (const filter in this.filters) {
      if (this.filters.hasOwnProperty(filter)) {
        atLeastOneFilter = true;
      }
    }
    // Call method
    if (atLeastOneFilter && onFilterChanged) {
      onFilterChanged(this.getFilters());
    }
    // Closd
    this.setVisible(false);
  }

  public render = () => {
    const style = computeStyleSheet();
    const { visible } = this.state;
    return (
      <Modal isVisible={visible}>
        <View style={style.contentFilter}>
          {this.props.children}
        </View>
        <Button style={style.buttonCloseFilter} full={true} primary={true} onPress={this.closeFiltersAndTriggerEvent} >
          <Text style={style.textButtonCloseFilter}>{I18n.t('general.close')}</Text>
        </Button>
      </Modal>
    );
  }
}
