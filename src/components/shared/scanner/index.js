/* eslint-disable max-statements */
import React, {
  Fragment, useEffect, useState, forwardRef, useImperativeHandle,
} from 'react';
import { AppState, SafeAreaView } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import QRCode from '@remobile/react-native-qrcode-local-image';

import CameraAccess from './cameraAccess';
import CameraOverlay from './cameraOverlay';
import CameraRoll from './cameraRoll';
import withTheme from '../withTheme';
import getStyles from './styles';

const Scanner = forwardRef(({
  styles,
  containerStyles: { scanner, cameraOverlay, cameraRoll } = {},
  onQRCodeRead,
  onClose,
  isCameraOpen,
  fullScreen,
  permissionDialogTitle,
  permissionDialogMessage,
  reference,
  navigation
}, ref) => {
  const [camera, setCamera] = useState({
    permission: 'undetermined',
    visible: false,
  });

  const [photo, setPhoto] = useState({
    permission: 'undetermined',
    visible: false,
  });

  const setPermissions = permissions => {
    setCamera(prevState => ({ ...prevState, permissions: permissions.camera }));
    setPhoto(prevState => ({ ...prevState, permissions: permissions.photo }));
  };

  const checkPermissions = () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      setPermissions(response);
    });
  };

  const readFromPhotoGallery = items => {
    setCamera(prevState => ({ ...prevState, visible: false }));
    setPhoto(prevState => ({ ...prevState, visible: false }));

    navigation.setOptions({
      tabBar: !photo.visible,
      headerLeft: true,
    });

    if (items.length > 0) {
      QRCode.decode(items[0].uri, (error, result) => {
        onQRCodeRead(result);
      });
    }
  };

  const toggleCamera = () => {
    if (typeof isCameraOpen === 'function') {
      isCameraOpen(!camera.visible);
    }
    setCamera(prevState => ({ ...prevState, visible: !prevState.visible }));

    if (!camera.visible && typeof onClose === 'function') {
      onClose();
    }
  };

  useImperativeHandle(ref, () => ({ toggleCamera }));

  const toggleGallery = () => {
    setPhoto(prevState => ({ ...prevState, visible: !prevState.visible }));
  };

  const readQRcode = event => {
    toggleCamera();
    onQRCodeRead(event.data);
  };

  useEffect(() => {
    checkPermissions();
    AppState.addEventListener('change', checkPermissions);
  }, []);

  return <Fragment>
    {camera.visible ? (
      <SafeAreaView style={styles.scannerContainer} >
        <RNCamera
          ref={reference}
          style={[styles.preview, styles.cameraPreview, scanner]}
          onBarCodeRead={readQRcode}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          notAuthorizedView={
            <CameraAccess close={toggleCamera} fullScreen={fullScreen} />
          }
          pendingAuthorizationView={
            <CameraAccess close={toggleCamera} />
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
            toggleGallery={toggleGallery}
            photoPermission={photo.permission}
            close={toggleCamera}
          />
        </RNCamera>
      </SafeAreaView>
    ) : null}
    <CameraRoll
      containerStyles={cameraRoll}
      onSelect={readFromPhotoGallery}
      permission={photo.permission}
      visible={photo.visible}
    />
  </Fragment>;
});

export default withTheme(Scanner, getStyles(), true);
