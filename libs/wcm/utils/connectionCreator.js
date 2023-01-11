import SignClient from '@walletconnect/sign-client';

import pkg from '../../../package.json';

// eslint-disable-next-line import/no-mutable-exports
export let signClient;

export async function createSignClient() {
  const res = await SignClient.init({
    projectId: process.env.PROJECT_ID ?? '8f2a5ab63f54b27471714e81d1a49da3',
    metadata: {
      name: pkg.name,
      description: pkg.description,
      url: pkg.homepage,
      // TODO: Replace this with Lisk Service provided assets.
      // (details on https://github.com/LiskHQ/lisk-mobile/issues/1594).
      icons: ['https://lisk.com/documentation/_/img/lisk-symbol.svg'],
    },
  });

  signClient = res;

  return signClient;
}
