import { FlatList, Image, Keyboard, KeyboardEvent, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { createRef, FC, useCallback, useEffect, useRef, useState } from 'react'
import { Wrapper, AText, defaultStyles, Container, IconX, ICON_TYPE, Row } from '~/components'
import { COLORS, deviceHeight, deviceWidth, getBottomSpace, getStatusBarHeight, normalize, screens, _keyExtractor } from '~/common';
import { IScreenProps } from '~/screens/shared/interface';
import { Input } from 'react-native-elements';
import LanguageStore from '~/stores/language/language.store';
import Animated, { interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import HomeContaint from './HomeContaint';
import { IMGAES } from '~/assets/images';

interface IProps extends IScreenProps {
}
const topHeight = normalize(80)
const leftMenuWidth = normalize(120)

const tempData = [
    { id: 1, name: 'Thor: Love & Thunder', img: IMGAES.poster1, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 2, name: 'Cung tam ke', img: IMGAES.poster2, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 3, name: 'Song Lang', img: IMGAES.poster3, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 4, name: 'Em va Trinh', img: IMGAES.poster4, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 5, name: 'Bi mat Dumbledore', img: IMGAES.poster5, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 6, name: 'Ngoi den ky quai 3', img: IMGAES.poster6, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 7, name: 'Doctor Strange: In the moutive of maxnet', img: IMGAES.poster7, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
    { id: 8, name: 'Vennom', img: IMGAES.poster8, type: ['Hanh dong', 'Hai', 'Tinh cam'], des: 'Thor: Tình yêu và sấm sét là phim điện ảnh Mỹ thuộc thể loại siêu anh hùng, dựa trên nhân vật cùng tên của Marvel Comics. Đây là phần tiếp theo của Thor: Tận thế Ragnarok, cũng sẽ là phim thứ 29 trong vũ trụ Điện ảnh Marvel. ' },
]
const HomeScreen: FC<IProps> = ({ navigation }) => {
    const { resource } = LanguageStore()
    const process = useSharedValue(1)
    const scrollValue = useSharedValue(0)

    // ACTION
    const showMenu = () => {
        process.value = process.value === 1 ? 0.6 : 1
    }
    // const [visibleIdx, setVisibleIdx] = useState([]);

    // const onViewRef = React.useRef((viewableItems: { changed: any[]; viewableItems: string | any[]; }) => {
    //     console.log(
    //         viewableItems.viewableItems,
    //         '-----------viewableItems.changed',
    //         viewableItems.viewableItems.length,
    //     );
    //     let temp = {};
    //     setVisibleIdx(viewableItems.changed.reduce((acc, curr) => {
    //         return { ...acc, [curr.item.id]: curr.isViewable }
    //     }, {}))
    // });
    // const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 20 });

    // ACTION
    const wrapper = (args) => {
        // bgRef.current?.scrollTo({ x: args * 2, y: 0, animated: true })
        console.log('-----------------------arges', args)

    };
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollValue.value = withSpring(event.contentOffset.y);
        console.log('----------------------------', event.contentOffset.y)
        runOnJS(wrapper)(event.contentOffset.y);
    });
    // STYLE
    const mainStyle = useAnimatedStyle(() => {
        const locationX = interpolate(process.value, [0.6, 1], [280, 0])
        const locationY = interpolate(process.value, [0.6, 1], [50, 0])
        const border = interpolate(process.value, [0.6, 1], [20, 0])
        return {
            transform: [{ scale: withTiming(process.value, { duration: 300 }) }, { translateX: withTiming(locationX) }, { translateY: withTiming(locationY) }],
            borderRadius: border
        }
    })
    const topStyle = useAnimatedStyle(() => {
        const locationY = interpolate(process.value, [0.6, 1], [0, -topHeight])
        const opacity = interpolate(process.value, [0.6, 1], [1, 0])
        return {
            transform: [{ translateY: withSpring(locationY) }],
            opacity
        }
    })
    const leftMenuStyle = useAnimatedStyle(() => {
        const locationX = interpolate(process.value, [0.6, 1], [0, -leftMenuWidth])
        const opacity = interpolate(process.value, [0.6, 1], [1, 0])
        return {
            transform: [{ translateX: withSpring(locationX) }],
            opacity
        }
    })

    // RENDER
    const _renderMainContaint = () => {
        return (
            <Animated.View style={[styles.containt, mainStyle]}>
                <View style={styles.topLableView}>
                    <AText>hihihi</AText>
                    <IconX name='menu-unfold' origin={ICON_TYPE.ANT_ICON} size={normalize(20)} onPress={showMenu} />
                </View>
                <Animated.FlatList
                    data={tempData}
                    extraData={tempData}
                    onScroll={scrollHandler}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={<HomeContaint />}
                    // onViewableItemsChanged={onViewRef.current}
                    // viewabilityConfig={viewConfigRef.current}
                    contentContainerStyle={{ marginTop: normalize(40), paddingBottom: normalize(40) }}
                    renderItem={({ item, index }) => {
                        return (
                            <Animated.View style={[styles.viewItem]}>
                                <Image source={item.img} style={{ width: normalize(70), height: normalize(100), borderRadius: normalize(10) }} />
                                <View style={{ flex: 1, marginLeft: normalize(10) }}>
                                    <AText h4 w600 txtStyle={{ color: COLORS.primary }}>{item.name}</AText>
                                    <AText h7 numberOfLines={4}>{item.des}</AText>
                                </View>
                            </Animated.View>
                        )
                    }}

                />

            </Animated.View>
        )
    }
    const _topMenu = () => {
        return (
            <Animated.View style={[styles.topStyle, topStyle]}>
                <View style={styles.topLable}>
                    <AText h4>Name</AText>
                </View>
                <IconX name='close' origin={ICON_TYPE.ANT_ICON} size={normalize(30)} onPress={showMenu} color={COLORS.black} />
            </Animated.View>
        )
    }
    const _rigntMenu = () => {
        return (
            <Animated.View style={[styles.rightStyle, leftMenuStyle]}>
                <LableMenu title='menu1' onpress={async () => { }} />
                <LableMenu title='menu2' onpress={async () => { }} />
                <LableMenu title='menu3' onpress={async () => { }} />
                <LableMenu title='menu4' onpress={async () => { }} />
                <LableMenu title='menu5' onpress={async () => { }} />
            </Animated.View>
        )
    }

    const LableMenu = (props: { title: string; onpress: () => {} }) => {
        const { title, onpress } = props
        return (
            <TouchableOpacity onPress={onpress} style={{ width: leftMenuWidth, height: normalize(50), justifyContent: 'center', paddingLeft: normalize(10) }}>
                <AText h4>{title}</AText>
            </TouchableOpacity>
        )
    }


    return (
        <Wrapper>
            {/* main view */}
            {_renderMainContaint()}
            {_rigntMenu()}
            {_topMenu()}
        </Wrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    ...defaultStyles,
    containt: {
        flex: 1,
        width: deviceWidth,
        // backgroundColor: COLORS.grayC4C4C4,
        height: deviceHeight,
        // paddingTop: normalize(20),
        paddingBottom: normalize(20),
        ...Platform.select({
            ios: {
                shadowOffset: { height: 10, width: 10 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    contantList: {
        flex: 1,
        width: deviceWidth,
        marginTop: normalize(10)
    },
    inputStyle: {
        height: normalize(30),
        paddingHorizontal: normalize(5),
        borderRadius: normalize(25),
        borderColor: COLORS.bgGray,
        borderWidth: normalize(1),
        width: deviceWidth * 0.9,
        alignSelf: 'center'
    },
    inputContaintStyle: {
        height: normalize(30),
        borderBottomWidth: 0,
        padding: 0
    },
    topStyle: {
        width: deviceWidth,
        height: topHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: getStatusBarHeight(),
        alignItems: 'center',
        paddingRight: normalize(20),
    },
    topLable: {
        width: normalize(200),
        height: topHeight,
        backgroundColor: COLORS.white,
        borderBottomRightRadius: normalize(30),
        borderTopRightRadius: normalize(30),
        ...defaultStyles.centerWrap
    },
    rightStyle: {
        width: leftMenuWidth,
        height: deviceHeight - topHeight - getStatusBarHeight() - getBottomSpace(),
        position: 'absolute',
        top: topHeight + getStatusBarHeight(),
        left: 0,
        paddingVertical: normalize(20),
    },
    viewItem: {
        width: deviceWidth,
        height: normalize(130),
        padding: normalize(15),
        marginVertical: normalize(7),
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        ...defaultStyles.shadow,
    },
    topLableView: {
        height: normalize(40),
        width: deviceWidth,
        paddingHorizontal: normalize(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
        opacity: .7,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
    }
})