import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, useEffect, useImperativeHandle } from 'react'
// import { observer } from 'mobx-react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import AText from './texts'
import { COLORS, normalize } from '~/common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyHeader } from '~/common/constants/KeyHeader'
import LanguageStore from '~/stores/language/language.store'
// import { createStore } from '~/stores'

const USLeft = normalize(2)
const VILeft = normalize(26)

type ChangeLanType = {
    containtStyle?: ViewStyle,
    ref?: any
}

const ChangeLanguage: FC<ChangeLanType> = React.forwardRef((props, ref) => {
    const { containtStyle = {} } = props
    // const {
    //     getListLangConfig, isLoading, dataListLang, errorListLang,
    //     getListLang, dataLang, errorLang,
    // } = createStore.languageStore
    const { locale, changeLanguage, loadResource } = LanguageStore()
    const positionLan = useSharedValue(USLeft);
    const widthLan = useSharedValue(1);

    useImperativeHandle(ref, () => ({
        selectLan
    }))

    useEffect(() => {
        getLanguage()
    }, []);

    const getLanguage = async () => {
        const token = await AsyncStorage.getItem(KeyHeader.language)
        if (token === 'vi') {
            positionLan.value = VILeft
        }
        if (token === 'en') {
            positionLan.value = USLeft
        }
    }
    const selectLan = async () => {
        let lan = positionLan.value > USLeft ? 'en' : 'vi' as 'en' | 'vi'
        // await AsyncStorage.setItem(KeyHeader.language, lan)
        // await getListLang(dataListLang.find(i => i.code === lan).id)
        // if (!isLoading) {
        changeLanguage(lan)
        positionLan.value = positionLan.value > USLeft ? USLeft : VILeft
        widthLan.value = 1.5
        setTimeout(() => {
            widthLan.value = 1
        }, 200);
        // }
    }

    const style = useAnimatedStyle(() => {
        return {
            left: withTiming(positionLan.value),
            transform: [{ scaleX: withTiming(widthLan.value) }],
        }
    })
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={selectLan} style={[styles.viewChangeLan, containtStyle]}>
            <Animated.View style={{ flex: 1, alignItems: 'center' }}>
                <AText h6>{'VI'}</AText>
            </Animated.View>
            <Animated.View style={{ flex: 1, alignItems: 'center' }}>
                <AText h6>{'EN'}</AText>
            </Animated.View>
            <Animated.View style={[{
                position: 'absolute',
                width: normalize(19),
                height: normalize(19),
                borderRadius: normalize(9.5),
                backgroundColor: COLORS.primary,
                left: normalize(2)
            }, style]} >
                {/* {isLoading && <ActivityIndicator color={COLORS.white} />} */}
            </Animated.View>
        </TouchableOpacity>
    )
})

export default ChangeLanguage

const styles = StyleSheet.create({
    viewChangeLan: {
        width: normalize(50),
        height: normalize(25),
        backgroundColor: COLORS.white,
        alignSelf: 'flex-end',
        marginRight: normalize(20),
        borderRadius: normalize(20),
        marginTop: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: normalize(1),
        borderColor: COLORS.primary
    }
})