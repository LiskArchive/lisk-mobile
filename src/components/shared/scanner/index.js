/* eslint-disable max-statements */
import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { useModal } from 'hooks/useModal';
import { AppState, SafeAreaView } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import QRCode from '@remobile/react-native-qrcode-local-image';
import { launchImageLibrary } from 'react-native-image-picker';

import CameraAccess from './cameraAccess';
import CameraOverlay from './cameraOverlay';
import withTheme from '../withTheme';
import getStyles from './styles';

const Scanner = forwardRef(
  (
    {
      styles,
      containerStyles: { scanner, cameraOverlay } = {},
      onQRCodeRead,
      onClose,
      onCameraVisibilityChange,
      fullScreen,
      permissionDialogTitle,
      permissionDialogMessage,
      reference,
      navigation,
    },
    ref
  ) => {
    const { toggle: toggleModalContext } = useModal();
    const [camera, setCamera] = useState({
      permission: 'undetermined',
      visible: false,
    });

    const [photo, setPhoto] = useState({
      permission: 'undetermined',
      visible: false,
    });

    const setPermissions = (permissions) => {
      setCamera((prevState) => ({ ...prevState, permissions: permissions.camera }));
      setPhoto((prevState) => ({ ...prevState, permissions: permissions.photo }));
    };

    const checkPermissions = useCallback(() => {
      Permissions.checkMultiple(['camera', 'photo']).then((response) => {
        setPermissions(response);
      });
    }, []);

    const readFromPhotoGallery = (items) => {
      setCamera((prevState) => ({ ...prevState, visible: false }));
      setPhoto((prevState) => ({ ...prevState, visible: false }));

      navigation.setOptions({
        tabBar: !photo.visible,
        headerLeft: true,
      });

      if (items.length > 0) {
        QRCode.decode(items[0].uri, (error, result) => {
          if (!error) {
            onQRCodeRead(result);
          }
        });
      }
    };

    const toggleCamera = useCallback(() => {
      setCamera((prevState) => ({ ...prevState, visible: !prevState.visible }));

      if (!camera.visible && typeof onClose === 'function') {
        onClose();
      }
    }, []);

    const closeCamera = useCallback(
      () => setCamera((prevState) => ({ ...prevState, visible: false })),
      []
    );

    useEffect(() => {
      if (typeof onCameraVisibilityChange === 'function') {
        onCameraVisibilityChange(camera.visible);
      }
      toggleModalContext(camera.visible);
    }, [camera.visible]);

    useImperativeHandle(ref, () => ({ toggleCamera, closeCamera }));

    const toggleGallery = async () => {
      const result = await launchImageLibrary();
      if (!result.didCancel) {
        readFromPhotoGallery(result.assets);
      }
    };

    const readQRcode = (event) => {
      toggleCamera();
      onQRCodeRead(event.data);
    };

    useEffect(() => {
      checkPermissions();
      AppState.addEventListener('change', checkPermissions);
    }, []);

    return (
      <Fragment>
        {camera.visible ? (
          <SafeAreaView style={styles.scannerContainer}>
            <RNCamera
              ref={reference}
              style={[styles.preview, styles.cameraPreview, scanner]}
              onBarCodeRead={readQRcode}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              notAuthorizedView={<CameraAccess close={toggleCamera} fullScreen={fullScreen} />}
              pendingAuthorizationView={<CameraAccess close={toggleCamera} />}
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
      </Fragment>
    );
  }
);

export default withTheme(Scanner, getStyles(), true);
