import { Dimensions, Keyboard, Platform, StatusBar, KeyboardEvent } from 'react-native';
import COLORS from './colors'
import { ESize, ETypePerson } from './enums'
import { screens } from './constants/screens'
import fonts from './fonts';

const { width, height } = Dimensions.get('window');

export const deviceWidth = width;
export const deviceHeight = height;

function isIphoneX() {
  const dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dim.height === 780 ||
      dim.width === 780 ||
      dim.height === 812 || //iphone X, 12 mini, iphone 11 pro,
      dim.width === 812 ||
      dim.height === 844 || //12 pro
      dim.width === 844 ||
      dim.height === 896 || //iphone 11 pro max
      dim.width === 896 ||
      dim.height === 926 || //iphone 12 pro max
      dim.width === 926)
  );
}
function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

function getStatusBarHeight(safe?: Boolean) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
const normalize = (fontSize, standardScreenHeight = 680) => {
  const standardLength = width > height ? width : height;
  const offset =
    width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight;
  const dvHeight =
    isIphoneX() || Platform.OS === 'android'
      ? standardLength - offset
      : standardLength;
  const heightPercent = (fontSize * dvHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

const _keyExtractor = (_, index) => index.toString()
const ITEMSPERPAGE = 10

export {
  COLORS,
  ESize, ETypePerson,
  normalize,
  isIphoneX,
  ifIphoneX,
  getBottomSpace,
  getStatusBarHeight,
  _keyExtractor,
  screens,
  ITEMSPERPAGE,
  fonts
}