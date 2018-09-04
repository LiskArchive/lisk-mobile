import React, { Fragment } from 'react';
import { View } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import QRCode from '@remobile/react-native-qrcode-local-image';
import CameraRollPicker from 'react-native-camera-roll-picker';
import styles from './styles';
import CameraAccess from './cameraAccess';
import CameraOverlay from './cameraOverlay';

class Scanner extends React.Component {
  state = {
    camera: {
      permitted: false,
      visible: false,
    },
    photo: {
      permitted: false,
      visible: false,
    },
  }

  componentDidMount() {
    this.checkPermissions();
  }

  checkPermissions = () => {
    Permissions.checkMultiple(['camera', 'photo']).then((response) => {
      this.setPermissions(response);
    });
  }

  setPermissions = (permissions) => {
    const { camera, photo } = this.state;
    camera.permitted = permissions.camera;
    photo.permitted = permissions.photo;
    this.setState({ camera, photo });
  }

  toggleCamera = () => {
    const { camera } = this.state;
    this.props.navigation.setParams({
      tabBar: !camera.visible,
      showButtonLeft: !camera.visible,
      action: this.toggleCamera,
      onBackPress: this.toggleCamera,
    });

    camera.visible = !camera.visible;
    this.setState({ camera });
  };

  toggleGallery = () => {
    const { photo, camera } = this.state;
    this.props.navigation.setParams({
      tabBar: true,
      showButtonLeft: true,
      action: !photo.visible ? this.toggleGallery : this.toggleCamera,
      onBackPress: this.toggleGallery,
    });

    photo.visible = !photo.visible;
    photo.camera = !photo.camera;
    this.setState({ camera, photo });
  }

  readFromPhotoGallery = (items) => {
    const { photo, camera } = this.state;
    photo.visible = false;
    camera.visible = false;
    this.setState({ photo, camera });

    this.props.navigation.setParams({
      tabBar: photo.visible,
      showButtonLeft: photo.visible,
    });

    if (items.length > 0) {
      QRCode.decode(items[0].uri, (error, result) => {
        this.decodeQR(result);
      });
    }
  }

  readQRcode = (event) => {
    this.toggleCamera();
    this.decodeQR(event.data);
  }

  decodeQR = (data) => {
    const recipientReg = /recipient=\d{1,21}L/;
    const amountReg = /amount=(\d+)\.?(\d+)?/;
    const liskProtocolReg = /^[l|L]isk:\/\//;

    if (liskProtocolReg.test(data) && recipientReg.test(data)) {
      const address = data.match(recipientReg)[0].replace('recipient=', '');
      const amount = data.match(amountReg)[0].replace('amount=', '');
      this.props.setAddress(address || '');
      this.props.setAmount(amount || '');
    } else {
      this.props.setAddress(data || '');
      this.props.setAmount('');
    }
  }

  render() {
    return (
      <Fragment>
        {
          this.state.camera.permitted !== 'denied' && this.state.camera.visible ?
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style = {styles.cameraPreview}
              onBarCodeRead={this.readQRcode}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              type={RNCamera.Constants.Type.back}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'Lisk needs to connect to your camera'} >
              <CameraOverlay
                toggleGallery={this.toggleGallery}
                galleryStatus={this.state.photo.permitted} />
            </RNCamera>
          : null
        }
        {
          this.state.camera.permitted === 'denied' && this.state.camera.visible ?
            <CameraAccess /> : null
        }
        {
          this.state.camera.permitted !== 'denied' && this.state.photo.visible ?
            <View style={styles.cameraPreview}>
              <CameraRollPicker
                selectSingleItem={true}
                callback={this.readFromPhotoGallery}
              />
            </View> : null
        }
      </Fragment>
    );
  }
}

export default Scanner;
