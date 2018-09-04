import React, { Fragment } from 'react';
import { View } from 'react-native';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import QRCode from '@remobile/react-native-qrcode-local-image';
import CameraRollPicker from 'react-native-camera-roll-picker';
import styles from './styles';
import CameraAccess from './cameraAccess';

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

  requestPermissions = () => {
    Permissions.checkMultiple(['camera', 'photo']).then((response) => {
      this.setPermissions(response);
    });
  }

  setPermissions = (permissions) => {
    const { camera, photo } = this.state;
    camera.permitted = permissions.camera === 'authorized';
    photo.permitted = permissions.photo === 'authorized';
    this.setState({ camera, photo });
  }

  toggleCamera = () => {
    if (!this.state.camera.permitted) {
      this.requestPermissions();
    } else {
      this.props.navigation.setParams({
        tabBar: !this.state.cameraVisibility,
        showButtonLeft: !this.state.cameraVisibility,
        action: this.toggleCamera,
        onBackPress: this.toggleCamera,
      });
      this.setState({
        cameraVisibility: !this.state.cameraVisibility,
      });
    }
  };

  toggleGallery = () => {
    if (!this.state.photo.permitted) {
      this.requestPermissions();
    } else {
      this.props.navigation.setParams({
        tabBar: true,
        showButtonLeft: true,
        action: !this.state.galleryVisibility ? this.toggleGallery : this.toggleCamera,
        onBackPress: this.toggleGallery,
      });
      this.setState({
        cameraVisibility: !this.state.cameraVisibility,
        galleryVisibility: !this.state.galleryVisibility,
      });
    }
  }

  readFromPhotoGallery = (items) => {
    this.setState({
      galleryVisibility: false,
    });
    this.props.navigation.setParams({
      tabBar: false,
      showButtonLeft: false,
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
          this.state.cameraVisibility ?
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
              {
                ({ status }) =>
                  <CameraAccess
                    toggleGallery={this.toggleGallery}
                    cameraStatus={status}
                    galleryStatus={this.state.photo.permitted} />
              }
            </RNCamera>
          : null
        }
        {
          this.state.galleryVisibility ? <View style={styles.cameraPreview}>
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
