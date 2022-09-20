/* eslint-disable max-statements */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'hooks/useTheme';

import { colors } from 'constants/styleGuide';
import { decodeLaunchUrl } from 'utilities/qrCode';
import { validateAddress } from 'utilities/validators';
import { stringShortener } from 'utilities/helpers';
import HeaderBackButton from 'components/navigation/headerBackButton';
import DropDownHolder from 'utilities/alert';
import { IconButton } from 'components/shared/toolBox/button';
import Input from 'components/shared/toolBox/input';
import Avatar from 'components/shared/avatar';
import Scanner from 'components/shared/scanner';
import KeyboardAwareScrollView from 'components/shared/toolBox/keyboardAwareScrollView';
import { P, Small } from 'components/shared/toolBox/typography';
import { selectBookmarkList } from '../store/selectors';
import { addBookmark, editBookmark } from '../store/actions';

import getStyles from './styles';

export default function AddBookmark({ route }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const bookmarkList = useSelector(selectBookmarkList);

  const { styles } = useTheme({ styles: getStyles() });

  const [address, setAddress] = useState({ value: '' });
  const [label, setLabel] = useState({ value: '' });
  const [incomingData, setIncomingData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const scanner = useRef();

  const errors = {
    label: i18next.t('The label must be shorter than 20 characters.'),
    address: i18next.t('Invalid address.'),
  };

  const setError = (validity, fieldName) => {
    switch (validity) {
      case 1:
        return errors[fieldName];
      case -1:
        return i18next.t('This field is required.');
      default:
        return '';
    }
  };

  const validateLabel = (str) => {
    if (str === '') {
      return -1;
    }
    return str.length > 20 ? 1 : 0;
  };

  const handleLabel = (value) => {
    setLabel({
      value,
      validity: validateLabel(value),
    });
  };

  const handleQRCodeRead = (data) => {
    const decodedData = decodeLaunchUrl(data);
    setAddress(decodedData.address);
  };

  const handleCloseScanner = () => {
    navigation.dispatch(CommonActions.setParams({ action: false }));
  };

  const handleSubmit = () => {
    const filteredAccount = bookmarkList?.filter(
      (account) => account.label.toLocaleLowerCase() === label.value.toLocaleLowerCase()
    );
    if (filteredAccount?.length) {
      return DropDownHolder.error(
        i18next.t('multisignature.error.title'),
        i18next.t('multisignature.error.description')
      );
    }
    const addressValidity = validateAddress('LSK', address.value);
    const labelValidity = validateLabel(label.value);
    if (incomingData && labelValidity === 0) {
      const action = editMode ? editBookmark : addBookmark;
      dispatch(action({ address: incomingData.address, label: label.value }));
      navigation.dispatch(CommonActions.goBack());
    } else if (addressValidity === 0 && labelValidity === 0) {
      dispatch(addBookmark({ address: address.value, label: label.value }));
      navigation.dispatch(CommonActions.goBack());
    } else {
      setAddress({
        value: address.value,
        validity: addressValidity,
      });
      setLabel({
        value: label.value,
        validity: labelValidity,
      });
    }
  };

  useEffect(() => {
    const handleAndroidBackButtonPress = () => {
      const action = route.params?.action ?? false;
      if (action && typeof action === 'function') {
        action();
        return true;
      }
      return false;
    };

    const account = route.params?.account ?? null;

    if (account) {
      const editMode = bookmarkList.filter((item) => item.address === account.address).length > 0;
      setEditMode(editMode);
      setLabel({ value: account.label || '' });
      setIncomingData(account);
      if (editMode) {
        navigation.setOptions({
          title: null,
          headerLeft: (props) => <HeaderBackButton {...props} title="Edit bookmark" />,
        });
      }
    }

    BackHandler.addEventListener('hardwareBackPress', handleAndroidBackButtonPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleAndroidBackButtonPress);
  }, [bookmarkList, navigation, route.params?.account, route.params?.action]);

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <Scanner
        ref={scanner}
        navigation={navigation}
        readFromCameraRoll={true}
        handleQRCodeRead={handleQRCodeRead}
        onClose={handleCloseScanner}
        permissionDialogTitle={i18next.t('Permission to use camera')}
        permissionDialogMessage={i18next.t('Lisk needs to connect to your camera')}
      />
      <KeyboardAwareScrollView
        onSubmit={handleSubmit}
        button={{
          title: editMode ? i18next.t('Save changes') : i18next.t('Add to bookmarks'),
        }}
        styles={{
          container: styles.container,
          innerContainer: styles.innerContainer,
        }}
      >
        <View style={styles.form}>
          {!incomingData ? (
            <View style={styles.addressContainer}>
              <Input
                label={i18next.t('Address')}
                autoCorrect={false}
                innerStyles={{
                  errorMessage: styles.errorMessage,
                }}
                onChange={setAddress}
                value={address.value}
                error={setError(address.validity, 'address')}
                adornments={{
                  left: <Avatar address={address.value} size={24} />,
                  right: (
                    <IconButton
                      onPress={() => scanner.current?.toggleCamera?.()}
                      titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
                      title={i18next.t('Scan')}
                      icon="scanner"
                      iconSize={18}
                      color={colors.light.ultramarineBlue}
                    />
                  ),
                }}
              />
            </View>
          ) : (
            <View style={styles.row}>
              <P style={[styles.label, styles.theme.label]}>Address</P>
              <View style={styles.staticAddressContainer}>
                <Avatar
                  address={incomingData?.address || ''}
                  style={styles.staticAvatar}
                  size={35}
                />
                <Small style={[styles.address, styles.theme.address]}>
                  {stringShortener(incomingData?.address, 6, 5)}
                </Small>
              </View>
            </View>
          )}

          <Input
            label={i18next.t('Label')}
            autoCorrect={false}
            innerStyles={{ inputLabel: styles.input }}
            multiline={false}
            onChange={handleLabel}
            error={setError(label.validity, 'label')}
            value={label.value}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
