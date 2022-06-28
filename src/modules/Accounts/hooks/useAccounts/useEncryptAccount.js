import { useSelector } from 'react-redux';
import { selectSettings } from 'store/selectors';
import { encryptAccount as encryptAccountUtils } from 'modules/Auth/utils';

export function useEncryptAccount() {
  const { enableCustomDerivationPath, customDerivationPath } = useSelector(selectSettings);
  const encryptAccount = ({ recoveryPhrase, password, name }) => encryptAccountUtils({
    recoveryPhrase,
    password,
    name,
    enableCustomDerivationPath,
    derivationPath: customDerivationPath,
  });
  return { encryptAccount };
}
