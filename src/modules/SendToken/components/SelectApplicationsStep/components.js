/* eslint-disable complexity */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { BookmarkList } from 'modules/Bookmark/components';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';
import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Input from 'components/shared/toolBox/input';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import BookmarksSvg from 'assets/svgs/BookmarksSvg';
import { stringShortener } from 'utilities/helpers';
import colors from 'constants/styleGuide/colors';
import { P } from 'components/shared/toolBox/typography';

import getSendTokenSelectApplicationsStepStyles, {
  getSendTokenRecipientAccountFieldStyles,
} from './styles';

export function SendTokenSenderApplicationField({
  value,
  onChange,
  errorMessage,
  applications,
  style,
}) {
  const senderApplication = applications.find((application) => application.chainID === value);

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  return (
    <Picker value={value} onChange={onChange} error={errorMessage}>
      <Picker.Label style={style?.label}>
        {i18next.t('sendToken.applicationsSelect.senderApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled
        placeholder={i18next.t('sendToken.applicationsSelect.senderApplicationFieldPlaceholder')}
        style={style?.toggle}
      >
        {senderApplication && (
          <View style={[styles.row]}>
            <Text style={[styles.text, styles.theme.text]}>{senderApplication.chainName}</Text>

            <Image
              source={{ uri: senderApplication.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </View>
        )}
      </Picker.Toggle>
    </Picker>
  );
}

export function SendTokenRecipientApplicationField({
  value,
  onChange,
  errorMessage,
  applications,
  style,
}) {
  const recipientApplication = applications.find((application) => application.chainID === value);

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const renderMenuItems = () => (
    <InfiniteScrollList
      data={applications}
      keyExtractor={(item) => item.chainID}
      renderItem={(item) => (
        <Picker.Item key={item.chainID} value={item.chainID} onChange={onChange}>
          <Text style={[styles.text, styles.theme.text]}>{item.chainName}</Text>

          <Image source={{ uri: item.logo.png }} style={[styles.applicationLogoImage]} />
        </Picker.Item>
      )}
      withDefaultSpinner
      // TODO: Integrate pagination props.
      // (details on https://github.com/LiskHQ/lisk-mobile/issues/1611).
    />
  );

  const { showOptions } = Picker.usePickerMenu(renderMenuItems());

  return (
    <Picker value={value} error={errorMessage}>
      <Picker.Label style={style?.label}>
        {i18next.t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled={applications.loading}
        placeholder={i18next.t('sendToken.applicationsSelect.recipientApplicationFieldPlaceholder')}
        style={style?.toggle}
        openMenu={showOptions}
      >
        {recipientApplication && (
          <View style={[styles.row]}>
            <Text style={[styles.text, styles.theme.text]}>{recipientApplication.chainName}</Text>

            <Image
              source={{ uri: recipientApplication.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </View>
        )}
      </Picker.Toggle>
    </Picker>
  );
}

export function SendTokenRecipientAccountField({
  value,
  onChange,
  errorMessage,
  addressFormat,
  onAddressFormatChange,
  style,
  isValidAddress,
}) {
  const bookmarks = useSelector(selectBookmarkList);

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const handleInputChange = (_value) => {
    if (addressFormat !== 'input') onAddressFormatChange('input');

    onChange(_value);
  };

  const handlePickerChange = (_value) => {
    if (addressFormat !== 'picker') onAddressFormatChange('picker');

    onChange(_value);
  };

  const renderOptions = () => (
    <BookmarkList
      renderEmpty
      Component={({ data }) => (
        <Picker.Item key={data.address} onChange={handleInputChange} value={data.address}>
          <Avatar address={data.address} size={40} />

          <View>
            {!!data.label && (
              <P style={[styles.accountName, styles.theme.accountName]}>{data.label}</P>
            )}

            <P style={[styles.accountAddress, styles.theme.accountAddress]}>
              {stringShortener(data.address, 6, 6)}
            </P>
          </View>
        </Picker.Item>
      )}
    />
  );

  const { showOptions } = Picker.usePickerMenu(renderOptions());

  return (
    <>
      <Input
        label={i18next.t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
        value={addressFormat === 'input' ? value : ''}
        placeholder="Input wallet address or choose a username"
        error={addressFormat === 'input' && errorMessage}
        adornments={{
          left: <Avatar address={value} size={24} />,
          right: isValidAddress && <CircleCheckedSvg variant="fill" />,
        }}
        onChange={handleInputChange}
        innerStyles={getSendTokenRecipientAccountFieldStyles(style)}
      />

      {bookmarks.length ? (
        <Picker
          value={addressFormat === 'picker' && value}
          onChange={handlePickerChange}
          error={addressFormat === 'picker' && errorMessage}
        >
          <Picker.Toggle
            openMenu={showOptions}
            placeholder={
              <View style={[styles.row]}>
                <BookmarksSvg
                  variant="outline"
                  color={colors.light.blueGray}
                  style={{ marginRight: 4 }}
                />

                <Text style={[styles.placeholder]}>
                  {i18next.t('sendToken.applicationsSelect.recipientAccountFieldPlaceholder')}
                </Text>
              </View>
            }
            style={style?.picker}
          />
        </Picker>
      ) : null}
    </>
  );
}
