import React from 'react'
import { View, Image } from 'react-native'
import { B } from '../../toolBox/typography'
import styles from './styles'

const Rejected = ({ sharedData: { amount }, status }) => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <Image source={{ uri: status }} style={styles.image} />
      <B style={styles.description}>
        Your request of {amount} LSK has been {status}.
      </B>
    </View>
  </View>
)

export default Rejected
