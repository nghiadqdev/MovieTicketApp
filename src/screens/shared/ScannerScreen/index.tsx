import React, { Component } from 'react'
import { Text, View, Platform, Dimensions, StyleSheet } from 'react-native';
// import { RNCamera, BarCodeType, Point, Size } from 'react-native-camera';
// import BarcodeMask from 'react-native-barcode-mask';
import Permissions, { check, request, requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { BaseScreen, IListenerScanner } from '../BaseScreen';
import { IScreenProps } from '../interface';
import { BindCommonProps } from '~/stores/base/decorator';
import { ICommonProps } from '~/stores';
import { ESize } from '~/common/enums';
import navService from '~/services/navigation/nav.service';


export interface IDataScan {
    data: string;
    rawData?: string;
    /**
     * @description For Android use `{ width: number, height: number, origin: Array<Point<string>> }`
     * @description For iOS use `{ origin: Point<string>, size: Size<string> }`
     */
    bounds: any
}
export interface IDataScanner {
    keyValue: string,
    data: string
}
interface IScannerParams extends IListenerScanner {
    keyValue: string,
    screen?: string,
}
interface IProps extends IScreenProps, ICommonProps {
    route?: {
        name?: string,
        params?: IScannerParams,
        screen?: string,
    }
}

@BindCommonProps()
export default class ScannerScreen extends BaseScreen<IProps> {

    unsubscribe;
    // camera = React.createRef<RNCamera>();

    state = {
        hasCameraPermission: null,
        isFocused: false,
        shouldReadBarCode: true
    }
    async componentDidMount() {
        const { navigation } = this.props
        this.unsubscribe = navigation.addListener('focus', (e) => {
            this.setState({
                isFocused: true
            })
        });
        try {
            if (Platform.OS === "ios") {
                const status = await request(PERMISSIONS.IOS.CAMERA)
                this.setState({ hasCameraPermission: status === 'granted' });
            }
            if (Platform.OS === "android") {
                const status = await request(PERMISSIONS.ANDROID.CAMERA)
                this.setState({ hasCameraPermission: status === 'granted' });
            }

        } catch (error) {
        }

    }
    render() {
        const { hasCameraPermission, shouldReadBarCode } = this.state;
        const { translate } = this.props

        if (hasCameraPermission === null) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Requesting for camera permission</Text>
                </View>
            )
        }
        if (hasCameraPermission === false) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
            </View>
        );
    }

    handleBarCodeScanned = (dataScan?: IDataScan) => {
        const { route, navigation } = this.props;
        const { onBarCodeRead, keyValue, screen } = route.params;

        if (dataScan) {
            if (onBarCodeRead) {
                this.setState({
                    shouldReadBarCode: false
                })
                const { data } = dataScan;
                onBarCodeRead({ data, keyValue });
                navigation.navigate(screen);
            }
        }
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});