import React, { Fragment } from 'react';
import { AppState } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import QRCode from '@remobile/react-native-qrcode-local-image';
import CameraAccess from './cameraAccess';
import CameraOverlay from './cameraOverlay';
import CameraRoll from './cameraRoll';
import ClosureOverlay from './closureOverlay';
import withTheme from '../../shared/withTheme';
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

    this.props.navigation.setParams({
      tabBar: camera.visible,
      showButtonLeft: !camera.visible,
      action: this.toggleCamera,
      onBackPress: this.toggleCamera,
    });

    camera.visible = !camera.visible;
    if (isCameraOpen) isCameraOpen(camera.visible);
    this.setState({ camera });

    if (!camera.visible && typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  };

  toggleGallery = () => {
    const { photo } = this.state;
    this.props.navigation.setParams({
      showButtonLeft: true,
      action: !photo.visible ? this.toggleGallery : this.toggleCamera,
      onBackPress: this.toggleGallery,
    });

    photo.visible = !photo.visible;
    this.setState({ photo });
  };

  readFromPhotoGallery = items => {
    const { photo, camera } = this.state;
    photo.visible = false;
    camera.visible = false;
    this.setState({ photo, camera });

    this.props.navigation.setParams({
      tabBar: !photo.visible,
      showButtonLeft: photo.visible,
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
      readFromCameraRoll,
      fullScreen,
      permissionDialogTitle,
      permissionDialogMessage,
    } = this.props;
    const { camera, photo } = this.state;
    return (
      <Fragment>
        {camera.visible ? (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={[styles.preview, styles.cameraPreview, scanner]}
            onBarCodeRead={this.readQRcode}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            type={RNCamera.Constants.Type.back}
            notAuthorizedView={
              <CameraAccess close={this.toggleCamera} fullScreen={fullScreen} />
            }
            pendingAuthorizationView={
              <CameraAccess close={this.toggleCamera} />
            }
            permissionDialogTitle={permissionDialogTitle}
            permissionDialogMessage={permissionDialogMessage}
          >
            {readFromCameraRoll ? (
              <CameraOverlay
                containerStyles={cameraOverlay}
                toggleGallery={this.toggleGallery}
                photoPermission={photo.permission}
              />
            ) : (
              <ClosureOverlay
                close={this.toggleCamera}
                containerStyles={cameraOverlay}
              />
            )}
          </RNCamera>
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
