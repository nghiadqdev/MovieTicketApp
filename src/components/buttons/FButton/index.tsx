import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ITheme } from '~/stores/theme/theme.model'
import FTouchOpacity, { ITouchOpacityProps } from '~/components/touchables/FTouchOpacity'
import { ThemeContext } from 'react-native-elements'


interface IProps extends ITouchOpacityProps {
    title?: string
}
export const Fbutton = (props: IProps) => {
    const context = useContext(ThemeContext)
    const { colors } = context.theme as ITheme
    const { title = '', ...resProps } = props

    return (
        <FTouchOpacity containerStyle={{ justifyContent: "center", alignItems: "center", backgroundColor: colors.primary, borderRadius: 10 }}   {...resProps} >
            <Text style={{ fontSize: 16, margin: 10, color: colors.white }}>{title}</Text>
        </FTouchOpacity>
    )
}
const styles = StyleSheet.create({
    buttonStyle: { borderWidth: 2 },
})
