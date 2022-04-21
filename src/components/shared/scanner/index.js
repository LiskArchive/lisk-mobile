import React, { Fragment } from 'react';
import { AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import QRCode from '@remobile/react-native-qrcode-local-image';

import CameraAccess from './cameraAccess';
import CameraOverlay from './cameraOverlay';
import CameraRoll from './cameraRoll';
import withTheme from '../withTheme';
import getStyles from './styles';

class Scanner extends React.Component {
  state = {
    camera: {
      permission: 'undetermined',
      visible: false,
    },
    photo: {
      permission: 'undetermined',
      visible: false,
    },
  };

  componentDidMount() {
    this.checkPermissions();
    AppState.addEventListener('change', this.checkPermissions);
  }

  checkPermissions = () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      this.setPermissions(response);
    });
  };

  setPermissions = permissions => {
    const { camera, photo } = this.state;
    camera.permission = permissions.camera;
    photo.permission = permissions.photo;
    this.setState({ camera, photo });
  };

  toggleCamera = () => {
    const { camera } = this.state;
    const { isCameraOpen } = this.props;

    camera.visible = !camera.visible;
    if (typeof isCameraOpen === 'function') {
      isCameraOpen(camera.visible);
    }
    this.setState({ camera });

    if (!camera.visible && typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  };

  toggleGallery = () => {
    const { photo } = this.state;
    photo.visible = !photo.visible;
    this.setState({ photo });
  };

  readFromPhotoGallery = items => {
    const { photo, camera } = this.state;
    photo.visible = false;
    camera.visible = false;
    this.setState({ photo, camera });

    this.props.navigation.setOptions({
      tabBar: !photo.visible,
      headerLeft: true,
    });

    if (items.length > 0) {
      QRCode.decode(items[0].uri, (error, result) => {
        this.props.onQRCodeRead(result);
      });
    }
  };

  readQRcode = event => {
    this.toggleCamera();
    this.props.onQRCodeRead(event.data);
  };

  render() {
    const {
      styles,
      containerStyles: { scanner, cameraOverlay, cameraRoll } = {},
      // readFromCameraRoll,
      fullScreen,
      permissionDialogTitle,
      permissionDialogMessage,
    } = this.props;
    const { camera, photo } = this.state;
    return (
      <Fragment>
        {camera.visible ? (
          <SafeAreaView style={styles.scannerContainer} >
            <RNCamera
              ref={this.props.ref}
              style={[styles.preview, styles.cameraPreview, scanner]}
              onBarCodeRead={this.readQRcode}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              notAuthorizedView={
                <CameraAccess close={this.toggleCamera} fullScreen={fullScreen} />
              }
              pendingAuthorizationView={
                <CameraAccess close={this.toggleCamera} />
              }
              androidCameraPermissionOptions={{
                title: permissionDialogTitle,
                message: permissionDialogMessage,
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              <CameraOverlay
                containerStyles={[styles.cameraOverlay, cameraOverlay]}
                toggleGallery={this.toggleGallery}
                photoPermission={photo.permission}
                close={this.toggleCamera}
              />
            </RNCamera>
          </SafeAreaView>
        ) : null}
        <CameraRoll
          containerStyles={cameraRoll}
          onSelect={this.readFromPhotoGallery}
          permission={photo.permission}
          visible={photo.visible}
        />
      </Fragment>
    );
  }
}

export default withTheme(Scanner, getStyles(), true);
