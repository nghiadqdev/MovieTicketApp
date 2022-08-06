import React, { Component, FC, useCallback, useEffect, useState } from 'react'
import { NavigationContainer, } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import navService from '~/services/navigation/nav.service'
import { IScreenProps } from '../screens/shared/interface'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyHeader } from '~/common/constants/KeyHeader';
import AuthStore from '~/stores/auth/auth.store';
import LanguageStore from '~/stores/language/language.store';
import AppNavigator from '~/navigator/app_navigator';
import AuthNavigator from '~/navigator/auth_navigator/AuthStack';

type RootProps = {
    onCompleteLoading: Function
}

const RootNavigation: FC<RootProps> = (props) => {
    const { onCompleteLoading } = props
    const [isToken, setToken] = useState(true);
    const { isSignIn, refreshToken } = AuthStore()
    const { loadResource, locale, changeLanguage } = LanguageStore()
    useEffect(() => {
        // checkToken()
        setLanguage()
        loadResource()
    }, [])

    const setLanguage = async () => {
        const lang = await getLanguage()
        if (!lang) {
            await AsyncStorage.setItem(KeyHeader.language, locale)
        } else {
            changeLanguage(lang as 'vi' | 'en')
        }
    }
    // const checkToken = async () => {
    //     const token = await getToken()
    //     if (token !== null) {
    //         const res = await refreshToken({
    //             skip: 0,
    //             take: 1,
    //         })
    //         setToken(res)
    //     }
    //     else {
    //         setToken(false)
    //     }
    //     onCompleteLoading()
    // }
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem(KeyHeader.token)
            return token !== null ? token : null;
        } catch (error) {
            return null;
        }
    }
    const getLanguage = async () => {
        try {
            const token = await AsyncStorage.getItem(KeyHeader.language)
            return token !== null ? token : false;
        } catch (error) {
            return false;
        }
    }

    const rootStack = useCallback(() => {
        if (isSignIn) {
            return <AppNavigator />
        } else return (
            <AuthNavigator />
        )
    }, [isSignIn])
    return (
        <NavigationContainer ref={navService.navigationRef}>
            {rootStack()}
        </NavigationContainer>
    )

}

export default RootNavigation;
