/* eslint-disable complexity */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Input from 'components/shared/toolBox/input';
import { P } from 'components/shared/toolBox/typography';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import CircleSvg from 'assets/svgs/CircleSvg';
import BookmarksSvg from 'assets/svgs/BookmarksSvg';
import { stringShortener } from 'utilities/helpers';
import colors from 'constants/styleGuide/colors';

import getSendTokenSelectApplicationsStepStyles,
{ sendTokenRecipientAccountFieldStyles } from './styles';

export function SendTokenSenderApplicationField({ form, applications }) {
  const { field } = useController({
    name: 'senderApplicationChainID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const senderApplication = applications?.data?.find(
    application => application.chainID === field.value
  );

  return (
    <Picker
      value={field.value}
      onChange={field.onChange}
      error={form.formState.errors.senderApplicationChainID?.message}
    >
      <Picker.Label>
        {i18next.t('sendToken.applicationsSelect.senderApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled
        placeholder={
          i18next.t('sendToken.applicationsSelect.senderApplicationFieldPlaceholder')
        }
      >
        {senderApplication && (
          <View style={[styles.row]}>
            <Text style={[styles.text, styles.theme.text]}>
              {senderApplication.name}
            </Text>

            <Image
              source={{ uri: senderApplication.images.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </View>
        )}
      </Picker.Toggle>
    </Picker>
  );
}

export function SendTokenRecipientApplicationField({ form, applications }) {
  const { field } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const recipientApplication = applications?.data?.find(
    application => application.chainID === field.value
  );

  return (
    <Picker
      value={field.value}
      onChange={field.onChange}
      error={form.formState.errors.recipientApplicationChainID?.message}
    >
      <Picker.Label style={{ marginTop: 16 }}>
        {i18next.t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled={applications?.loading}
        placeholder={
          i18next.t('sendToken.applicationsSelect.recipientApplicationFieldPlaceholder')
        }
      >
        {recipientApplication && (
          <View style={[styles.row]}>
            <Text style={[styles.text, styles.theme.text]}>
              {recipientApplication.name}
            </Text>

            <Image
              source={{ uri: recipientApplication.images.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </View>
        )}
      </Picker.Toggle>

      <Picker.Menu>
        <InfiniteScrollList
          data={applications?.data}
          keyExtractor={(item) => item.chainID}
          renderItem={(item) => (
            <Picker.Item
              key={item.chainID}
              value={item.chainID}
            >
              <Text style={[styles.text, styles.theme.text]}>
                {item.name}
              </Text>

              <Image
                source={{ uri: item.images.logo.png }}
                style={[styles.applicationLogoImage]}
              />
            </Picker.Item>
          )}
          renderSpinner
          // TODO: Integrate pagination props using react-query.
        />
      </Picker.Menu>
    </Picker>
  );
}

export function SendTokenRecipientAccountField({ form, accounts }) {
  const { field: addressField } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const { field: addressFormatField } = useController({
    name: 'recipientAccountAddressFormat',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const recipientAccount = accounts.find(
    account => account.metadata.address === addressField.value
  );

  function handleInputChange(value) {
    if (addressFormatField.value !== 'input') addressFormatField.onChange('input');

    addressField.onChange(value);
  }

  function handlePickerChange(value) {
    if (addressFormatField.value !== 'picker') addressFormatField.onChange('picker');

    addressField.onChange(value);
  }

  return (
    <>
      <Input
        label={i18next.t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
        value={addressFormatField.value === 'input' ? addressField.value : ''}
        placeholder="Input wallet address or choose a username"
        onChange={handleInputChange}
        error={addressFormatField.value === 'input'
          && form.formState.errors.recipientAccountAddress?.message}
        adornments={{
          left: (!addressField.value || addressFormatField.value === 'picker') && <CircleSvg />,
          right: !!addressField.value && addressFormatField.value === 'input' && (
           <CircleCheckedSvg variant="fill"/>
          )
        }}
        innerStyles={sendTokenRecipientAccountFieldStyles}
      />

      <Picker
        value={addressFormatField.value === 'picker' && addressField.value}
        onChange={handlePickerChange}
        error={addressFormatField.value === 'picker'
          && form.formState.errors.recipientAccountAddress?.message}
      >
        <Picker.Toggle
          placeholder={
            <View style={[styles.row]}>
              <BookmarksSvg variant="outline" color={colors.light.blueGray} style={{ marginRight: 4 }}/>

              <Text style={[styles.placeholder]}>
                {i18next.t('sendToken.applicationsSelect.recipientAccountFieldPlaceholder')}
              </Text>
            </View>
          }
        >
          {addressFormatField.value === 'picker' && recipientAccount && (
            <>
              <View style={[styles.row]}>
                <Avatar
                  address={recipientAccount.metadata.address}
                  size={24}
                  style={{ marginRight: 8 }}
                />

                <Text style={[styles.text, styles.theme.text]}>
                  {recipientAccount.metadata.name}
                </Text>

                <Text style={[styles.accountAddress, styles.theme.accountAddress]}>
                  {stringShortener(recipientAccount.metadata.address, 5, 5)}
                </Text>
              </View>

              <CircleCheckedSvg variant="fill" />
            </>
          )}
        </Picker.Toggle>

        {/* TODO: Redirect to bookmarks picker when is fixed
          (replace this menu with it) */}
        <Picker.Menu>
          <InfiniteScrollList
            data={accounts}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <Picker.Item
                key={item.metadata.address}
                value={item.metadata.address}
              >
                <Avatar address={item.metadata.address} size={45} style={styles.avatar} />

                <View style={styles.content}>
                  {!!item.metadata.name && (
                    <P style={[styles.username, styles.theme.username]}>
                      {item.metadata.name}
                    </P>
                  )}

                  <P style={[styles.address, styles.theme.address]}>
                    {stringShortener(item.metadata.address, 6, 6)}
                  </P>
                </View>
              </Picker.Item>
            )}
            renderSpinner
          />
        </Picker.Menu>
      </Picker>
    </>
  );
}
