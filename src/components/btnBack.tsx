import { Keyboard, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS, normalize } from '~/common'
import { IconX, ICON_TYPE } from '~/components'

const BtnBack = (props: { onPress?: () => {}, style?: ViewStyle }) => {
    const { onPress, style } = props
    const handlePress = () => {
        Keyboard.dismiss()
        onPress()
    }
    return (
        <IconX
            name='arrowleft'
            origin={ICON_TYPE.ANT_ICON}
            size={normalize(25)}
            color={COLORS.black}
            onPress={handlePress}
            style={Object.assign({ alignSelf: 'flex-start', margin: normalize(20) }, style)}
        />
    )
}

export default BtnBack

const styles = StyleSheet.create({})