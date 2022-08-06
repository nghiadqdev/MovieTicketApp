import React from "react";
import { View, StyleSheet, TouchableOpacity, } from "react-native";
// import { RNCamera, } from 'react-native-camera';
import { IDataPicture } from "~/components/views/ModalTakePicture";
import navService from "~/services/navigation/nav.service";

export default class CameraScreen extends React.Component<any, any> {
    // camera = React.createRef<RNCamera>()

    takePicture = async () => {
        if (this.camera) {
            const { route } = this.props;
            const { handleTakePicture, key } = route.params
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.current.takePictureAsync(options);
            handleTakePicture({ uri: data.uri, base64: data.base64, } as IDataPicture);
            navService.goBack();
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <RNCamera
                    ref={this.camera}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                    }}
                    type={RNCamera.Constants.Type.back}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    playSoundOnCapture
                >
                    <View style={{ flex: 0, flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 0 }}>
                        <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture} />
                    </View>
                </RNCamera> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 35,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        height: 70,
        width: 70,
    },
});