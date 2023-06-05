/* eslint-disable max-statements */
import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import i18next from 'i18next';
import { useModal } from 'hooks/useModal';
import { AppState, SafeAreaView } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import DropDownHolder from 'utilities/alert';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import CameraAccess from './CameraAccess';
import CameraOverlay from './CameraOverlay';
import withTheme from '../withTheme';
import getStyles from './Scanner.styles';

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

    const handleSelectedImageError = () =>
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.qrCodeError'));

    const readFromPhotoGallery = (items) => {
      setCamera((prevState) => ({ ...prevState, visible: false }));
      setPhoto((prevState) => ({ ...prevState, visible: false }));

      navigation.setOptions({
        tabBar: !photo.visible,
        headerLeft: true,
      });

      if (items.length > 0) {
        RNQRGenerator.detect({
          uri: items[0].uri,
        })
          .then((response) => {
            const { values } = response;

            if (!values.length) {
              return handleSelectedImageError();
            }
            return onQRCodeRead(values[0]);
          })
          .catch(() => handleSelectedImageError());
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
