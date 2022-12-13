import { stringShortener } from 'utilities/helpers';

export function getAccountDownloadableFilename(address) {
  const prefix = 'encrypted_secret_recovery_phrase_';
  const extension = '.json';
  const addressAlias = stringShortener(address, 7, 5);

  return prefix + addressAlias + extension;
}
