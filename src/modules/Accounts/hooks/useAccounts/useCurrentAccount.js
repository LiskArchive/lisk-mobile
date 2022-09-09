import { useSelector, useDispatch } from 'react-redux'
import { setCurrentAccount } from '../../store/actions'
import { selectCurrentAccount } from '../../store/selectors'

// eslint-disable-next-line
export function useCurrentAccount() {
  const dispatch = useDispatch()
  const setAccount = (accountSchema) => {
    dispatch(setCurrentAccount(accountSchema))
  }
  const currentAccount = useSelector(selectCurrentAccount)

  return [currentAccount, setAccount]
}
