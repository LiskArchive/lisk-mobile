/* eslint-disable complexity */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { BookmarkList } from 'modules/Bookmark/components';
import { selectBookmarkList } from 'modules/Bookmark/store/selectors';
import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Input from 'components/shared/toolBox/input';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import CircleSvg from 'assets/svgs/CircleSvg';
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

  return (
    <Picker value={value} onChange={onChange} error={errorMessage}>
      <Picker.Label style={style?.label}>
        {i18next.t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled={applications.loading}
        placeholder={i18next.t('sendToken.applicationsSelect.recipientApplicationFieldPlaceholder')}
        style={style?.toggle}
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

      <Picker.Menu>
        <InfiniteScrollList
          data={applications}
          keyExtractor={(item) => item.chainID}
          renderItem={(item) => (
            <Picker.Item key={item.chainID} value={item.chainID}>
              <Text style={[styles.text, styles.theme.text]}>{item.chainName}</Text>

              <Image source={{ uri: item.logo.png }} style={[styles.applicationLogoImage]} />
            </Picker.Item>
          )}
          renderSpinner
          // TODO: Integrate pagination props using react-query.
        />
      </Picker.Menu>
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
}) {
  const bookmarks = useSelector(selectBookmarkList);

  const recipientAccount = bookmarks.find((bookmark) => bookmark.address === value);

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  function handleInputChange(_value) {
    if (addressFormat !== 'input') onAddressFormatChange('input');

    onChange(_value);
  }

  function handlePickerChange(_value) {
    if (addressFormat !== 'picker') onAddressFormatChange('picker');

    onChange(_value);
  }

  return (
    <>
      <Input
        label={i18next.t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
        value={addressFormat === 'input' ? value : ''}
        placeholder="Input wallet address or choose a username"
        onChange={handleInputChange}
        error={addressFormat === 'input' && errorMessage}
        adornments={{
          left: (!value || addressFormat === 'picker') && <CircleSvg />,
          right: !!value && addressFormat === 'input' && <CircleCheckedSvg variant="fill" />,
        }}
        innerStyles={getSendTokenRecipientAccountFieldStyles(style)}
      />

      <Picker
        value={addressFormat === 'picker' && value}
        onChange={handlePickerChange}
        error={addressFormat === 'picker' && errorMessage}
      >
        <Picker.Toggle
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
        >
          {addressFormat === 'picker' && recipientAccount && (
            <View style={[styles.row]}>
              <Avatar address={recipientAccount.address} size={24} />

              <Text style={[styles.accountName, styles.theme.accountName]}>
                {recipientAccount.label}
              </Text>

              <Text style={[styles.accountAddress, styles.theme.accountAddress]}>
                {stringShortener(recipientAccount.address, 5, 5)}
              </Text>

              <CircleCheckedSvg variant="fill" style={{ marginLeft: 8 }} />
            </View>
          )}
        </Picker.Toggle>

        <Picker.Menu>
          <BookmarkList
            renderEmpty
            Component={({ data }) => (
              <Picker.Item key={data.address} value={data.address}>
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
        </Picker.Menu>
      </Picker>
    </>
  );
}
