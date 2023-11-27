import SignClient from '@walletconnect/sign-client';
import { to } from 'await-to-js';

import pkg from '../../../package.json';

export async function createSignClient(icon) {
  const [error, result] = await to(
    SignClient.init({
      projectId: process.env.PROJECT_ID,
      metadata: {
        name: pkg.name,
        description: pkg.description,
        url: pkg.homepage,
        icons: [icon],
      },
    })
  );

  if (error) {
    throw error;
  }

  if (!result) {
    throw new Error('Not able to setup WalletConnect client.');
  }

  return result;
}
