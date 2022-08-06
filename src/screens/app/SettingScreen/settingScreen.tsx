import { ActivityIndicator, Animated, Easing, FlatList, Image, StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Row, AText, defaultStyles, Wrapper, IconX, ICON_TYPE } from '~/components'
import { COLORS, deviceWidth, ITEMSPERPAGE, normalize, screens, _keyExtractor } from '~/common'
import { Input, InputProps, ThemeProps } from 'react-native-elements'
import toastService from '~/services/toast/toast.service'
import { IScreenProps } from '~/screens/shared/interface'
import { IMGAES } from '~/assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyHeader } from '~/common/constants/KeyHeader'
import LanguageStore from '~/stores/language/language.store'

interface IProps extends IScreenProps {
}
const SettingScreen: FC<IProps> = ({ navigation }) => {
  const { resource, locale, changeLanguage, loadResource } = LanguageStore()
  const [name, setName] = useState('' as string);
  const [username, setUsername] = useState('' as string);
  const [password, setPassword] = useState('' as string);
  const [lang, setLang] = useState('en' as string);
  const flagAnimate = useRef(new Animated.ValueXY()).current;

  // EFFECT
  useEffect(() => {
    setLang(locale)
    let xPos = locale === 'vi' ? 0 : deviceWidth / 1.4 - normalize(90)
    Animated.spring(flagAnimate, {
      toValue: { x: xPos, y: 0 },
      useNativeDriver: false
    }).start()
  }, []);

  //ACTION
  const handleChangeLanguage = async (item: string) => {
    const temp = await AsyncStorage.getItem(KeyHeader.language)
    if (lang !== item) {
      changeLanguage(item)
      loadResource()
      setLang(item)
      let xPos = item === 'vi' ? 0 : deviceWidth / 1.4 - normalize(90)
      Animated.timing(flagAnimate, {
        toValue: { x: xPos, y: 0 },
        easing: Easing.bezier(0, .88, .7, .78),
        useNativeDriver: false
      }).start()
    }
  }
  //RENDER
  const _renderContaint = () => {
    return (
      <View style={styles.containtStyle}>
        <AText h3 w700>{resource?.["ChangeLanguage"]}</AText>
        {_changeLanguage}
        <AText h3 w700>{resource?.["SettingAccount"]}</AText>
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.btnBottom}>
            <AText h1 w700 txtStyle={{ color: COLORS.white }}>{resource?.["SettingAccount"]}</AText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnBottom, { backgroundColor: COLORS.redee1c1c }]}>
            <AText h1 w700 txtStyle={{ color: COLORS.white }}>{resource?.["SettingAccount"]}</AText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const _changeLanguage = useMemo(() => {
    return (
      <View style={styles.viewChangeFlag}>
        <TouchableOpacity onPress={() => handleChangeLanguage('vi')} style={lang === 'vi' ? styles.btnLanguageSelect : styles.btnLanguage}>
          <Image source={IMGAES.VNFlag} style={styles.imgFillParent} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeLanguage('en')} style={lang === 'en' ? styles.btnLanguageSelect : styles.btnLanguage}>
          <Image source={IMGAES.ENFlag} style={styles.imgFillParent} />
        </TouchableOpacity>
        <Animated.View style={[{ transform: [{ translateX: flagAnimate.x }] }, styles.viewFlag]} />
      </View>
    )
  }, [lang, flagAnimate])

  return (
    <Wrapper bgStatusBarColor={COLORS.primary} >
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        {_renderContaint()}
      </View>
    </Wrapper>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  ...defaultStyles,
  containtStyle: {
    flex: 1,
    width: deviceWidth,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
  },
  btnLanguageSelect: {
    padding: normalize(5),
    width: normalize(90),
    height: normalize(60),
  },
  btnLanguage: {
    width: normalize(90),
    height: normalize(60),
    borderRadius: normalize(5),
    overflow: 'hidden',
  },
  viewFlag: {
    width: normalize(90),
    height: normalize(60),
    borderWidth: normalize(1),
    borderColor: COLORS.black,
    position: 'absolute',
    left: 0,
    opacity: 0.7
  },
  inputStyle: {
    borderWidth: normalize(1),
    borderColor: COLORS.bgGray,
    height: normalize(35),
    width: deviceWidth - normalize(60),
    paddingHorizontal: normalize(5)
  },
  ipContaintStyle: {
    borderBottomWidth: 0,
    height: normalize(35),
    padding: 0
  },
  viewChangeFlag: {
    width: deviceWidth / 1.4,
    height: normalize(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnChangPass: {
    padding: normalize(10),
    paddingVertical: normalize(5),
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    borderColor: COLORS.black,
    backgroundColor: COLORS.blu002aff,
    alignSelf: 'flex-start',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    paddingBottom: normalize(10),
  },
  btnBottom: {
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    borderColor: COLORS.black,
    backgroundColor: COLORS.blu002aff,
    width: deviceWidth / 2 - normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(5)
  }
})