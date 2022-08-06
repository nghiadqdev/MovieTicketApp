import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { IMGAES } from '~/assets/images'
import { COLORS, deviceHeight, deviceWidth, normalize } from '~/common'
import Animated, { interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { defaultStyles } from '~/components'

const WIDTH_PANDER = deviceWidth / 2
const HomeContaint = () => {
    const listPoster = [
        // {},
        { name: 'Poster 1', img: IMGAES.poster1 },
        { name: 'Poster 2', img: IMGAES.poster2 },
        { name: 'Poster 3', img: IMGAES.poster3 },
        { name: 'Poster 4', img: IMGAES.poster4 },
        { name: 'Poster 5', img: IMGAES.poster5 },
        { name: 'Poster 6', img: IMGAES.poster6 },
        { name: 'Poster 7', img: IMGAES.poster7 },
        { name: 'Poster 8', img: IMGAES.poster8 },
        // {}
    ]
    const bgRef = useRef(null)
    const process = useSharedValue(0);

    // ACTION
    const wrapper = (args) => {
        bgRef.current?.scrollTo({ x: args * 2, y: 0, animated: true })
    };

    const scrollHandler = useAnimatedScrollHandler((event) => {
        process.value = withSpring(event.contentOffset.x);
        runOnJS(wrapper)(event.contentOffset.x);
    });

    // RENDER
    const _topContaint = () => {
        return (
            <View style={{ zIndex: 1, width: deviceWidth, height: WIDTH_PANDER * 2, backgroundColor: 'transparent' }}>
                <Animated.ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={{ paddingHorizontal: WIDTH_PANDER / 2 }}
                    snapToInterval={deviceWidth / 2}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}>
                    {listPoster.map((item, index) => {
                        const style = useAnimatedStyle(() => {
                            const inpuRange = [(index - 1) * WIDTH_PANDER, (index - 0.5) * WIDTH_PANDER, index * WIDTH_PANDER, (index + 0.5) * WIDTH_PANDER, (index + 1) * WIDTH_PANDER]
                            let scale = interpolate(process.value, inpuRange, [.6, .6, 1, .6, .6])
                            let tranY = interpolate(process.value, inpuRange, [80, 80, 0, 80, 80])
                            return {
                                transform: [{ scale }, { translateY: tranY }],
                                // opacity: scale
                            }
                        })

                        return (
                            <View style={{ width: WIDTH_PANDER, height: WIDTH_PANDER * 2, ...defaultStyles.centerWrap }}>
                                <Animated.View style={[{ flex: 1, overflow: 'hidden', }, style]}>
                                    {item && item.img ? <Image
                                        resizeMode='stretch'
                                        key={index}
                                        source={item.img}
                                        style={{ width: WIDTH_PANDER, borderRadius: normalize(10), height: WIDTH_PANDER * 2 - normalize(60) }} /> : null}
                                </Animated.View>
                            </View>
                        )
                    })}
                </Animated.ScrollView>
            </View>
        )
    }
    const _bgContaint = () => {
        return (
            <View style={{ position: 'absolute', top: -normalize(40), zIndex: -1, opacity: 0.5, width: deviceWidth, height: deviceHeight * .8 }}>
                {/* <Animated.ScrollView
                    ref={bgRef}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    scrollEnabled={false}
                    scrollEventThrottle={16}
                    disableScrollViewPanResponder={true}
                    horizontal={true}> */}
                {listPoster.map((item, index) => {
                    const style = useAnimatedStyle(() => {
                        const inpuRange = [(index - 1) * WIDTH_PANDER, (index - 0.5) * WIDTH_PANDER, index * WIDTH_PANDER, (index + 0.5) * WIDTH_PANDER, (index + 1) * WIDTH_PANDER]
                        let scale = interpolate(process.value, inpuRange, [0, 0.5, 1, 0.5, 0])
                        // let zIndex = interpolate(process.value, inpuRange, [0, 0.5, 1, 0.5, 0])
                        return {
                            // transform: [{ scale }],
                            opacity: scale,
                            // zIndex
                        }
                    })

                    return (
                        <View style={{ width: deviceWidth, height: deviceHeight * .8, ...defaultStyles.centerWrap, ...StyleSheet.absoluteFillObject }}>
                            <Animated.View style={[{ flex: 1, overflow: 'hidden', }, style]}>
                                {item && item.img ? <Image
                                    key={index}
                                    source={item.img}
                                    style={{ width: deviceWidth, height: deviceHeight * .8 }} /> : null}
                            </Animated.View>
                        </View>
                    )
                })}
                {/* </Animated.ScrollView> */}
            </View>
        )
    }


    return (
        <View>
            {_topContaint()}
            {_bgContaint()}
        </View>
    )
}

export default HomeContaint

const styles = StyleSheet.create({})