import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
    SafeAreaView,
} from 'react-native';
import { Button, } from 'react-native-elements'
import { PERMISSIONS, request } from "react-native-permissions";
import * as ImagePicker from 'react-native-image-picker';
import navService from '~/services/navigation/nav.service';
import COLORS from '~/common/colors/colors';
export interface IDataPicture {
    uri: string,
    name: string,
    base64?: string,
    paramKey: string,
}

const options: ImagePicker.CameraOptions = {
    quality: 1.0,
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
    saveToPhotos: true,
};
export default class TakePictureScreen extends React.Component<any, any> {
    state = {
        response: null,
        hasCameraPermission: null,
    }

    async componentWillMount() {
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



    handleTakePicture = (response: ImagePicker.ImagePickerResponse) => {
        const { route } = this.props
        const { handleTakePicture, key } = route.params
        // console.log(route.params);
        if (handleTakePicture) {
            handleTakePicture({ uri: response.uri, name: response.fileName, base64: response.base64, paramKey: key } as IDataPicture);
            navService.goBack();
        }
    }

    render() {
        const { route } = this.props
        const { imageLibrary } = route.params
        return (
            <SafeAreaView>
                <View style={{
                    height: '100%',
                    bottom: 0,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgb(120, 120, 120)'
                }}>
                    <View />
                    <View style={{
                        height: 170,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}>
                        <View style={{
                            height: 160,
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                        }}>
                            <View />
                            <Button
                                title="Chụp ảnh"
                                buttonStyle={styles.btnFrame}
                                onPress={() =>
                                    ImagePicker.launchCamera(
                                        options,
                                        (response) => {
                                            console.log("Chụp ảnh");
                                            this.handleTakePicture(response);
                                        },
                                    )
                                }
                            />
                            {imageLibrary && (
                                <Button
                                    title="Chọn ảnh từ thư viện"
                                    buttonStyle={styles.btnFrame}
                                    onPress={() =>
                                        ImagePicker.launchImageLibrary(
                                            options,
                                            (response) => {
                                                console.log("thư viện");
                                                this.handleTakePicture(response);
                                            },
                                        )
                                    }
                                />
                            )}
                            <Button
                                title="Thoát"
                                buttonStyle={{ borderRadius: 15, backgroundColor: 'red' }}
                                onPress={() => {
                                    navService.goBack();
                                }}
                            />
                        </View>
                    </View>

                </View>


                {/* <Button
                        title="Take video"
                        onPress={() =>
                            ImagePicker.launchCamera({ mediaType: 'video' }, (response) => {
                                this.setState({ response });
                            })
                        }
                    />

                    <Button
                        title="Select video"
                        onPress={() =>
                            ImagePicker.launchImageLibrary({ mediaType: 'video' }, (response) => {
                                this.setState({ response });
                            })
                        }
                    /> */}

                {/* <View style={styles.response}>
                    <Text>Res: {JSON.stringify(this.state.response)}</Text>
                </View>

                {this.state.response && (
                    <View style={styles.image}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={{ uri: this.state.response.uri }}
                        />
                    </View>
                )} */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    btnFrame: {
        borderRadius: 15, backgroundColor: COLORS.primary
    }
});