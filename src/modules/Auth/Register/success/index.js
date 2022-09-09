import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { translate } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { P } from 'components/shared/toolBox/typography'
import { PrimaryButton } from 'components/shared/toolBox/button'
import HeaderPlaceholderButton from 'components/navigation/headerPlaceholderButton'
import { useNavigation } from '@react-navigation/native'
import image from 'assets/images/registrationProcess/success3x.png'
import styles from './styles'

const Success = ({ t, hideNav }) => {
  const navigation = useNavigation()
  useEffect(() => {
    const { setOptions } = navigation
    hideNav()
    setOptions({
      headerLeft: () => <HeaderPlaceholderButton />,
      title: t('Perfect! You’re all set'),
    })
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <P style={styles.subTitle}>
              {t('Great! now you can use your passphrase to sign in to your account.')}
            </P>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={image} />
          </View>
        </View>
        <View>
          <PrimaryButton
            testID="registerSuccess"
            style={styles.button}
            onClick={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              })
            }
            title={t('Sign in now')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default translate()(Success)
