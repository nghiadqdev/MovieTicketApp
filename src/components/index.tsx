import { FDismissKeyboard, Wrapper, ICON_TYPE, IconX, Row, Item, Container } from './views'
import AHeader from './headers'
import AText from './texts'
import { Platform, StyleSheet } from 'react-native';
import LableShowDetail from './LableShow'
import InputDefault from './inputs/inputDefault'
import ChangeLanguage from './ChangeLanguage'

const defaultStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumnCenterStretch: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imgFillParent: {
    width: "100%",
    height: "100%",
  },
  centerWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export {
  FDismissKeyboard,
  Wrapper,
  AHeader,
  AText,
  ICON_TYPE, IconX,
  Row,
  defaultStyles,
  LableShowDetail,
  Item,
  Container,
  InputDefault,
  ChangeLanguage
}