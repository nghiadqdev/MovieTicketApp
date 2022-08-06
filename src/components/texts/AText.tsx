import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { COLORS, fonts, normalize } from '~/common';
import { isIOS } from 'react-native-elements/dist/helpers';

type NTtextStyle = {
  txtStyle?: TextStyle,
  children?: any,
  title?: boolean,
  h1?: boolean,
  h2?: boolean,
  h3?: boolean,
  h4?: boolean,
  h45?: boolean,
  h5?: boolean,
  h56?: boolean,
  h6?: boolean,
  h7?: boolean,
  h1Style?: object,
  h2Style?: object,
  h3Style?: object,
  h4Style?: object,
  h45Style?: object,
  h5Style?: object,
  h56Style?: object,
  h6Style?: object,
  h7Style?: object,
  w300?: boolean,
  w400?: boolean,
  w500?: boolean,
  w600?: boolean,
  w700?: boolean,
  center?: boolean,
  numberOfLines?: number,
}

const AText: FC<NTtextStyle> = props => {
  const {
    txtStyle,
    children,
    title,
    h1,
    h2,
    h3,
    h4,
    h45,
    h5,
    h56,
    h6,
    h7,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h45Style,
    h5Style,
    h56Style,
    h6Style,
    h7Style,
    w300,
    w400,
    w500,
    w600,
    w700,
    center,
    numberOfLines,
    ...rest
  } = props;

  return (
    <Text
      numberOfLines={numberOfLines || null}
      // {...rest}
      style={[
        { fontFamily: fonts.medium },
        w300 && styles.w300,
        w400 && styles.w400,
        w500 && styles.w500,
        w600 && styles.w600,
        w700 && styles.w700,
        center && styles.center,
        title && styles.title,
        h1 && h1Style,
        h2 && h2Style,
        h3 && h3Style,
        h4 && h4Style,
        h45 && h45Style,
        h5 && h5Style,
        h56 && h56Style,
        h6 && h6Style,
        h7 && h7Style,
        txtStyle
      ]}>
      {children}
    </Text>
  );
};

const styles = {
  title: {
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: normalize(25),
    lineHeight: normalize(35),
    color: COLORS.primary,
    // fontFamily: fonts.roboto
  },
  w300: {
    fontWeight: '300',
  },
  w400: {
    fontWeight: '400',
  },
  w500: {
    fontWeight: isIOS ? '500' : '700',
  },
  w600: {
    fontWeight: isIOS ? '600' : '700',
  },
  w700: {
    fontWeight: '700',
  },
  center: {
    textAlign: 'center',
  },
};

AText.defaultProps = {
  txtStyle: {},
  children: '',
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h45: false,
  h5: false,
  h56: false,
  h6: false,
  h7: false,
  h1Style: { fontSize: normalize(22), color: COLORS.black, },
  h2Style: { fontSize: normalize(20), color: COLORS.black, },
  h3Style: { fontSize: normalize(18), color: COLORS.black, },
  h4Style: { fontSize: normalize(16), color: COLORS.black, lineHeight: normalize(20) },
  h45Style: { fontSize: normalize(15), color: COLORS.black, },
  h5Style: { fontSize: normalize(14), color: COLORS.black, lineHeight: normalize(18) },
  h56Style: { fontSize: normalize(13), color: COLORS.black, },
  h6Style: { fontSize: normalize(12), color: COLORS.black, },
  h7Style: { fontSize: normalize(11), color: COLORS.black, },
  w300: false,
  w400: false,
  w500: false,
  w600: false,
  w700: false,
  center: false,
};
export default AText;
