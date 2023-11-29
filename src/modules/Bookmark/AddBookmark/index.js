/* eslint-disable max-statements */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'contexts/ThemeContext';
import Toast from 'react-native-toast-message';

import { validateAddress } from 'utilities/validators';
import { stringShortener } from 'utilities/helpers';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Input from 'components/shared/toolBox/input';
import Avatar from 'components/shared/avatar';
import { P } from 'components/shared/toolBox/typography';
import { selectBookmarkList } from '../store/selectors';
import { addBookmark, editBookmark } from '../store/actions';

import getStyles from './styles';

export default function AddBookmark({ route }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const bookmarkList = useSelector(selectBookmarkList);

  const { styles } = useTheme({ styles: getStyles() });

  const [address, setAddress] = useState({ value: route.params?.address || '' });
  const [label, setLabel] = useState({ value: '' });
  const [incomingData, setIncomingData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const errors = {
    label: i18next.t('bookmarks.addBookmark.invalidLabel'),
    address: i18next.t('bookmarks.addBookmark.invalidAddress'),
  };

  const setError = (validity, fieldName) => {
    switch (validity) {
      case 1:
        return errors[fieldName];
      case -1:
        return i18next.t('bookmarks.addBookmark.required');
      default:
        return '';
    }
  };

  const validateLabel = (str = '') => {
    if (str.trim().length === '') {
      return -1;
    }
    if (str.length < 3 || str.length > 20) {
      return 1;
    }
    return 0;
  };

  const handleLabel = (value = '') => {
    setLabel({
      value: value.trim(),
      validity: validateLabel(value.toLocaleLowerCase()),
    });
  };

  const handleGoBack = () =>
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          state: {
            index: 0,
            routes: [
              {
                name: 'AccountHome',
                state: {
                  index: 0,
                  routes: [{ name: 'Bookmarks' }],
                },
              },
            ],
          },
        },
      ],
    });

  const handleSubmit = () => {
    const filteredAccount = bookmarkList?.filter(
      (account) => account.label.toLocaleLowerCase() === label.value.toLocaleLowerCase()
    );
    if (filteredAccount?.length) {
      return Toast.show({
        type: 'error',
        text1: i18next.t('multisignature.error.title'),
        text2: i18next.t('multisignature.error.description'),
      });
    }
    const addressValidity = validateAddress(address.value);
    const labelValidity = validateLabel(label.value);
    if (incomingData && labelValidity === 0) {
      const action = editMode ? editBookmark : addBookmark;
      dispatch(action({ address: incomingData.address, label: label.value }));
      handleGoBack();
    } else if (addressValidity === 0 && labelValidity === 0) {
      dispatch(addBookmark({ address: address.value, label: label.value }));
      handleGoBack();
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
          headerLeft: (props) => (
            <HeaderBackButton {...props} title={i18next.t('bookmarks.editBookmark.title')} />
          ),
        });
      }
    }

    BackHandler.addEventListener('hardwareBackPress', handleAndroidBackButtonPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', handleAndroidBackButtonPress);
  }, [bookmarkList, navigation, route.params?.account, route.params?.action]);

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title={i18next.t('bookmarks.addBookmark.title')} onPress={handleGoBack} />

      <ScrollView style={styles.body} testID="add-bookmark-screen">
        {!incomingData ? (
          <View style={styles.addressContainer}>
            <Input
              label={
                <View style={styles.labelContainer}>
                  <P style={[styles.label, styles.theme.label]}>
                    {i18next.t('bookmarks.addBookmark.addressLabel')}
                  </P>
                </View>
              }
              autoCorrect={false}
              autoCapitalize="none"
              innerStyles={{ errorMessage: styles.errorMessage }}
              testID="bookmark-address-input"
              onChange={(value) => setAddress({ value })}
              value={address.value}
              error={setError(address.validity, 'address')}
              adornments={{
                left: <Avatar address={address.value} size={24} />,
              }}
            />
          </View>
        ) : (
          <View style={styles.row}>
            <P style={[styles.label, styles.theme.label]}>
              {i18next.t('bookmarks.addBookmark.addressLabel')}
            </P>

            <View style={styles.staticAddressContainer}>
              <Avatar address={incomingData.address || ''} style={styles.staticAvatar} size={35} />

              <P style={[styles.address, styles.theme.address]}>
                {stringShortener(incomingData.address, 6, 5)}
              </P>
            </View>
          </View>
        )}

        <Input
          testID="bookmark-label-input"
          label={i18next.t('bookmarks.addBookmark.labelLabel')}
          autoCorrect={false}
          autoCapitalize="none"
          innerStyles={{ inputLabel: styles.input }}
          multiline={false}
          onChange={handleLabel}
          error={setError(label.validity, 'label')}
          value={label.value}
        />
      </ScrollView>

      <View style={[styles.footer]}>
        <PrimaryButton onClick={handleSubmit} noTheme testID="add-bookmark-button">
          {editMode
            ? i18next.t('bookmarks.addBookmark.saveButtonText')
            : i18next.t('bookmarks.addBookmark.addButtonText')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
