import React, { useState } from 'react'
import { View } from 'react-native'
import { translate } from 'react-i18next'
import withTheme from 'components/shared/withTheme'
import Avatar from 'components/shared/avatar'
import Input from 'components/shared/toolBox/input'
import { P } from 'components/shared/toolBox/typography'
import { PrimaryButton } from 'components/shared/toolBox/button'
import { colors, themes } from 'constants/styleGuide'
import getStyles from './styles'

const PasswordForm = ({ address, styles, onPress, testID, t, theme, onSubmit }) => {
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container} onPress={onPress} testID={testID}>
      <View style={styles.content}>
        <Avatar address={address} size={45} style={styles.avatar} />
        <P style={[styles.address, styles.theme.address]}>{address}</P>
        <Input
          placeholder={t('auth.form.enterPassword')}
          autoCorrect={false}
          autoFocus
          innerStyles={{
            containerStyle: [styles.inputContainer],
          }}
          placeholderTextColor={
            theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
          }
          onChange={setPassword}
          value={password}
          returnKeyType="done"
        />
      </View>
      <PrimaryButton
        noTheme
        title={t('banners.btcRemoval.buttons.gotIt')}
        disabled={!password}
        onPress={() => onSubmit(password)}
      />
    </View>
  )
}

export default withTheme(translate()(PasswordForm), getStyles())
