import { encryptAccount as encryptAccountUtils } from 'modules/Auth/utils';
import { defaultDerivationPath } from '../../Auth/constants/recoveryPhrase.constants';

export function useEncryptAccount(useDerivationPath) {
  const encryptAccount = ({ recoveryPhrase, password, name, derivationPath }) =>
    encryptAccountUtils({
      recoveryPhrase,
      password,
      name,
      enableCustomDerivationPath: useDerivationPath,
      // Use default derivation path if derivationPath is not passed
      derivationPath: useDerivationPath && !derivationPath ? defaultDerivationPath : derivationPath,
    });
  return { encryptAccount };
}
