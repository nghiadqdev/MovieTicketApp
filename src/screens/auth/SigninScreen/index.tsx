import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator, ScrollView } from 'react-native'
import toastService from '~/services/toast/toast.service'
import { IScreenProps } from '~/screens/shared/interface'
import { IMGAES } from '~/assets/images'
import NetworkUtils from '~/@helpers/network/NetworkUtills'
import { Wrapper, FDismissKeyboard } from '../../../components/views'
import { COLORS, deviceWidth, ESize, normalize } from '~/common'
import { AText, ChangeLanguage, InputDefault } from '~/components'
import LanguageStore from '~/stores/language/language.store'
import AuthStore from '~/stores/auth/auth.store'
import Lottie from 'lottie-react-native';
import { LOTTIE } from '~/assets/icons'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated'
import * as Animatable from 'react-native-animatable';
interface IProps extends IScreenProps {

}

const SigninScreen: FC<IProps> = () => {
    const { resource } = LanguageStore();
    const { signIn, isLoading } = AuthStore();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const passRef = useRef(null)
    const animationRef = useRef<Lottie>(null)
    const process = useSharedValue(0);

    // EFFECT
    useEffect(() => {
        //set a specific startFrame and endFrame with:
        animationRef.current?.play(0, 135);
        process.value = 1
    }, [])
    useEffect(() => {
        signIn({
            username: 'nv007',
            password: '123123'
        });
    }, []);

    // ACTION
    const submitLogin = async () => {
        const checkNetwork = await NetworkUtils.isNetworkAvailable();
        let temp = {
            username, password
        }
        if (username === '' || password === '') {
            setError('Tên đăng nhặp và mật khẩu không được để trống')
        }
        else if (checkNetwork) {
            await signIn(temp);
        } else {
            toastService.error("Không có kết nối mạng!");
        }
    }
    // RENDER
    const formInput = useCallback(() => {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false} >
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={700} direction="alternate">
                        <InputDefault
                            lable=''
                            ipHeight={normalize(40)}
                            placeholder={resource?.['Username']}
                            onChangeText={value => setUsername(value)}
                            onSubmitEditing={() => passRef.current.focus()}
                            returnKeyType={'send'}
                            value={username}
                            leftIcon={{ type: 'font-awesome', name: 'user', color: COLORS.primary, size: normalize(25) }}
                        />
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={900} direction="alternate">
                        <InputDefault
                            customRef={passRef}
                            lable=''
                            ipHeight={normalize(40)}
                            placeholder={resource?.['Password']}
                            onChangeText={value => setPassword(value)}
                            secureTextEntry={true}
                            value={password}
                            leftIcon={{ type: 'font-awesome', name: 'lock', color: COLORS.primary, size: normalize(25) }}
                            onSubmitEditing={submitLogin}
                            returnKeyType={'send'} />
                        {error !== '' ? <AText txtStyle={{ fontSize: 15, color: 'red' }} >{error}</AText> : <View style={{ height: 20 }} />}
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={1200} direction="alternate">
                        <TouchableOpacity
                            disabled={!!isLoading}
                            onPress={submitLogin}
                            style={[styles.bottomLogin, { opacity: isLoading ? 0.7 : 1 }]}>
                            {!isLoading ?
                                <AText h1 w700 txtStyle={styles.txtLogin}>
                                    {resource?.['Login']}
                                </AText> :
                                <ActivityIndicator color={COLORS.white} size={'large'} />}
                        </TouchableOpacity>
                    </Animatable.View>
                </ScrollView>
            </View>
        )
    }, [username, password, error, resource])


    const logoStyle = useAnimatedStyle(() => {
        const scale = interpolate(process.value, [0, 1], [2.5, 1])
        const transY = interpolate(process.value, [0, 1], [100, 0])
        return {
            transform: [{ scale: withDelay(500, withTiming(scale, { duration: 800 })) }, { translateY: withDelay(500, withTiming(transY, { duration: 400 })) }],
        }
    })
    const inputStyle = useAnimatedStyle(() => {
        const scale = interpolate(process.value, [0, 1], [2, 1])
        return {
            transform: [{ scale: withDelay(500, withTiming(process.value, { duration: 400 })) }],
        }
    })
    return (
        <Wrapper safeAreaBgColor='white' >
            <View style={[styles.container, { height: ESize.heightScreen }]}>
                {/* logo App */}
                <Animated.View style={[styles.flexCenter, logoStyle]}>
                    <Lottie
                        ref={animationRef}
                        source={LOTTIE.iconMovie}
                        loop={false}
                        style={styles.iconStyle}
                    />
                </Animated.View>
                <Animated.View style={[styles.viewInput, inputStyle]}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={500} direction="alternate">
                        <ChangeLanguage />
                    </Animatable.View>
                    {formInput()}
                </Animated.View>
                {/* <View style={styles.flexCenter} /> */}
            </View>
        </Wrapper>
    )
}

export default SigninScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    flexCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth
    },
    viewInput: {
        flex: 2.3,
        paddingHorizontal: 20
    },
    inputStyle: {
        backgroundColor: "white",
        borderRadius: 5,
        height: normalize(50)
    },
    bottomLogin: {
        height: normalize(50),
        width: normalize(190),
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    txtLogin: {
        color: 'white',
        textTransform: 'uppercase'
    },
    iconStyle: {
        width: normalize(100),
        height: normalize(100)
    }
})