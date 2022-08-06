import React from 'react';
import {View, StyleSheet} from 'react-native';
import { deviceWidth } from '~/common';

const Container = props => {
  const {style} = props;
  return <View style={[styles.container, style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Container;
