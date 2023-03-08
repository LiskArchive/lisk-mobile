import { useSelector } from 'react-redux';
import { selectSettings } from 'store/selectors';
import { encryptAccount as encryptAccountUtils } from 'modules/Auth/utils';

export function useEncryptAccount() {
  const { useDerivationPath } = useSelector(selectSettings);
  const encryptAccount = ({ recoveryPhrase, password, name, derivationPath }) =>
    encryptAccountUtils({
      recoveryPhrase,
      password,
      name,
      enableCustomDerivationPath: useDerivationPath,
      derivationPath,
    });
  return { encryptAccount };
}
