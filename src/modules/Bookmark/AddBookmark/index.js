/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { translate } from 'react-i18next';
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
import getStyles from './styles';
import { addBookmark, editBookmark } from '../store/actions';

// eslint-disable-next-line max-statements
const AddToBookmark = ({
  t,
  lng,
  route,
}) => {
  const bookmarkList = useSelector(selectBookmarkList);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { styles } = useTheme({ styles: getStyles() });
  const [address, setAddress] = useState({ value: '' });
  const [label, setLabel] = useState({ value: '' });
  const [incomingData, setIncomingData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const scanner = useRef();

  const errors = {
    label: t('The label must be shorter than 20 characters.'),
    address: t('Invalid address.')
  };
  const setError = (validity, fieldName) => {
    switch (validity) {
      case 1:
        return errors[fieldName];
      case -1:
        return t('This field is required.');
      default:
        return '';
    }
  };

  const onBackButtonPressedAndroid = () => {
    const action = route.params?.action ?? false;
    if (action && typeof action === 'function') {
      action();
      return true;
    }
    return false;
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
      validity: validateLabel(value)
    });
  };

  const onQRCodeRead = (data) => {
    const decodedData = decodeLaunchUrl(data);
    setAddress(decodedData.address);
  };

  const onCloseScanner = () => {
    navigation.dispatch(CommonActions.setParams({ action: false }));
  };

  // eslint-disable-next-line max-statements
  const submitForm = () => {
    const filteredAccount = bookmarkList?.filter(
      (account) => account.label.toLocaleLowerCase() === label.value.toLocaleLowerCase()
    );
    if (filteredAccount?.length) {
      return DropDownHolder.error(t('multisignature.error.title'), t('multisignature.error.description'));
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
        validity: addressValidity
      });
      setLabel({
        value: label.value,
        validity: labelValidity
      });
    }
  };

  // eslint-disable-next-line max-statements
  useEffect(() => {
    const account = route.params?.account ?? null;
    const { setOptions } = navigation;
    if (account) {
      const editMode = bookmarkList
        .filter((item) => item.address === account.address).length > 0;
      setEditMode(editMode);
      setLabel({ value: account.label || '' });
      setIncomingData(account);
      if (editMode) {
        setOptions({
          title: null,
          headerLeft: (props) => <HeaderBackButton {...props} title="Edit bookmark" />,
        });
      }
    }
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressedAndroid);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressedAndroid);
  }, []);

  return <View style={[styles.wrapper, styles.theme.wrapper]}>
    <Scanner
      ref={scanner}
      navigation={navigation}
      readFromCameraRoll={true}
      onQRCodeRead={onQRCodeRead}
      onClose={onCloseScanner}
      permissionDialogTitle={t('Permission to use camera')}
      permissionDialogMessage={t('Lisk needs to connect to your camera')}
    />
    <KeyboardAwareScrollView
      onSubmit={submitForm}
      button={{
        title: editMode ? t('Save changes') : t('Add to bookmarks')
      }}
      styles={{
        container: styles.container,
        innerContainer: styles.innerContainer
      }}
    >
      <View style={styles.form}>
        {!incomingData ? (
          <View style={styles.addressContainer}>
            <IconButton
              onPress={() => scanner.current?.toggleCamera?.()}
              titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
              style={[styles.scanButton, lng === 'de' ? styles.longTitle : null]}
              title={t('Scan')}
              icon="scanner"
              iconSize={18}
              color={colors.light.ultramarineBlue}
            />
            <Avatar style={styles.avatar} address={address.value} size={24} />
            <Input
              label={t('Address')}
              autoCorrect={false}
              innerStyles={{
                errorMessage: styles.errorMessage,
                input: [
                  styles.input,
                  styles.addressInput,
                  styles.addressInputWithAvatar
                ],
                containerStyle: styles.addressInputContainer
              }}
              onChange={setAddress}
              value={address.value}
              error={setError(address.validity, 'address')}
            />
          </View>
        ) : (
          <View style={styles.row}>
            <P style={[styles.label, styles.theme.label]}>Address</P>
            <View style={styles.staticAddressContainer}>
              <Avatar
                address={incomingData.address || ''}
                style={styles.staticAvatar}
                size={35}
              />
              <Small style={[styles.address, styles.theme.address]}>
                {stringShortener(incomingData.address, 6, 5)}
              </Small>
            </View>
          </View>
        )}
        <Input
          label={t('Label')}
          autoCorrect={false}
          innerStyles={{ input: styles.input }}
          multiline={false}
          onChange={handleLabel}
          error={setError(label.validity, 'label')}
          value={label.value}
        />
      </View>
    </KeyboardAwareScrollView>
  </View>;
};

export default translate()(AddToBookmark);
