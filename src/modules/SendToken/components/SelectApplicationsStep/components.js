import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useController } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Input from 'components/shared/toolBox/input';
import { P } from 'components/shared/toolBox/typography';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import CircleSvg from 'assets/svgs/CircleSvg';
import { stringShortener } from 'utilities/helpers';

import getSendTokenSelectApplicationsStepStyles from './styles';

export function SendTokenSenderApplicationField({ form, applications, t }) {
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
        {t('sendToken.applicationsSelect.senderApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled
        placeholder={t('sendToken.applicationsSelect.senderApplicationFieldPlaceholder')}
      >
        {senderApplication && (
          <View style={[styles.applicationNameContainer]}>
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

export function SendTokenRecipientApplicationField({ form, applications, t }) {
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

  console.log({ blaaa: field.value });

  return (
    <Picker
      value={field.value}
      onChange={field.onChange}
      error={form.formState.errors.recipientApplicationChainID?.message}
    >
      <Picker.Label style={{ marginTop: 16 }}>
        {t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled={applications?.loading}
        placeholder={
          t('sendToken.applicationsSelect.recipientApplicationFieldPlaceholder')
        }
      >
        {recipientApplication && (
          <View style={[styles.applicationNameContainer]}>
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

export function SendTokenRecipientAccountField({ form, accounts, t }) {
  const [filledInput, setFilledInput] = useState();

  const { field } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const recipientAccount = accounts.find(
    account => account.metadata.address === field.value
  );

  function handleInputChange(event) {
    if (filledInput !== 'input') setFilledInput('input');

    field.onChange(event);
  }

  function handlePickerChange(event) {
    if (filledInput !== 'picker') setFilledInput('picker');

    field.onChange(event);
  }

  return (
    <>
      <Input
        label={t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
        value={filledInput === 'input' && field.value}
        placeholder="Input wallet address or choose a username"
        onChange={handleInputChange}
        error={filledInput === 'input'
          && form.formState.errors.recipientAccountAddress?.message}
        adornments={{
          left: <CircleSvg />,
          right: !!field.value && filledInput === 'input' && (
           <CircleCheckedSvg variant="fill"/>
          )
        }}
        innerStyles={{
          containerStyle: {
            paddingTop: 0,
            paddingRight: 0,
            paddingLeft: 0,
            marginBottom: 16,
            marginTop: 16,
          },
          inputLabel: {
            marginBottom: 8
          },
          input: {
            padding: 16
          }
        }}
      />

      <Picker
        value={filledInput === 'picker' && field.value}
        onChange={handlePickerChange}
        error={filledInput === 'picker'
          && form.formState.errors.recipientAccountAddress?.message}
      >
        <Picker.Toggle
          placeholder={t('sendToken.applicationsSelect.recipientAccountFieldPlaceholder')}
        >
          {filledInput === 'picker' && recipientAccount && (
            <>
              <View style={[styles.applicationNameContainer]}>
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

                {/* <View>{active && <CircleCheckedSvg variant="fill" />}</View> */}
              </Picker.Item>
            )}
            renderSpinner
            // TODO: Integrate pagination props using react-query.
          />
        </Picker.Menu>
      </Picker>
    </>
  );
}
