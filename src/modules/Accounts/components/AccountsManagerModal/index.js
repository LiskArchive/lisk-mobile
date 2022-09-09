import React from 'react'

import { useTheme } from 'hooks/useTheme'
import BottomModal from 'components/shared/BottomModal'
import AccountItem from '../AccountItem'
import AccountsManager from '../AccountsManager'

import getAccountsManagerModalStyles from './styles'

export default function AccountsManagerModal({ show, setShow }) {
  const { styles } = useTheme({ styles: getAccountsManagerModalStyles() })

  return (
    <BottomModal show={show} toggleShow={setShow} style={{ container: styles.container }}>
      <AccountsManager
        mode="modal"
        onAccountPress={() => setShow(false)}
        item={AccountItem}
        style={{ footer: styles.footer }}
        swipeToClose={false}
      />
    </BottomModal>
  )
}
