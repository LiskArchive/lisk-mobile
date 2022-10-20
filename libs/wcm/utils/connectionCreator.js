import SignClient from '@walletconnect/sign-client';
import pkg from '../../../package.json';

// eslint-disable-next-line import/no-mutable-exports
export let signClient;

export async function createSignClient() {
  signClient = await SignClient.init({
    logger: 'debug',
    projectId: process.env.PROJECT_ID,
    relayUrl: process.env.RELAY_URL,
    metadata: {
      name: pkg.name,
      description: pkg.description,
      url: pkg.homepage,
      // @todo replace this with Lisk Service provided assets by #4465
      icons: ['https://lisk.com/documentation/_/img/lisk-symbol.svg'],
    },
  });

  console.log({ createSignClient: signClient });

  // return signClient;
}
