import React, { Component } from 'react'
import { Text, View, Image, ImageBackground } from 'react-native'
import { BindStore, BindCommonStore } from '~/stores/base/decorator'
import { IScreenProps } from '~/screens/shared/interface';
import { BaseScreen } from '../BaseScreen';
import { ICommonStore } from '~/stores';
import { apiService } from '~/services/network/api.service';
import { IWithTheme } from '~/stores/theme/theme.model';
import { IMGAES } from '~/assets/images';
import { StyleSheet } from "react-native";
import { ESize } from "~/common/enums/ESize";
import toastService from '~/services/toast/toast.service';
import commonService from '~/services/common/common.service';

interface IProps extends IScreenProps, ICommonStore, IWithTheme {

}


@BindCommonStore()
export default class SplashScreen extends BaseScreen<IProps> {

    async componentDidMount() {
        const { authStore, languageStore, themeStore } = createStore
        const { isLoading, loadResource } = authStore;
        languageStore.loadResource();
        toastService.setThemeStore(themeStore)
        toastService.setLanguageStore(languageStore)
        commonService.setAuthStore(authStore);
        await loadResource();
    }

    render() {
        const { colors } = this.props.themeStore.theme
        return (
            <ImageBackground style={{ flex: 1 }} resizeMode="stretch" source={IMGAES.logo}>

            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    image: {
        height: ESize.widthScreen / 4,
    }
})