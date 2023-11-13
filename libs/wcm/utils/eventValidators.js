import * as Lisk from '@liskhq/lisk-client';
import { parseRelayParams } from '@walletconnect/utils';
import qs from 'qs';
import i18next from 'i18next';

import { EVENTS } from '../constants/lifeCycle';

export function validateConnectionNameSpace(event) {
  const isSessionProposal = event?.name === EVENTS.SESSION_PROPOSAL;

  if (!isSessionProposal) {
    throw new Error(
      i18next.t('application.externalConnectionValidation.errors.namespaceErrorDescription')
    );
  }

  const requiredNamespaces = event?.meta?.params?.requiredNamespaces;

  const nameSpaceKeys = requiredNamespaces && Object.keys(requiredNamespaces);

  const isNameSpaceValid =
    nameSpaceKeys && nameSpaceKeys.length === 1 && nameSpaceKeys.includes('lisk');

  return isNameSpaceValid;
}

export function validateConnectionSchema(event) {
  const isSchemaInEvent = event?.meta?.params?.request?.params?.schema;

  if (!isSchemaInEvent) {
    throw new Error(
      i18next.t('application.externalConnectionValidation.errors.schemaErrorDescription')
    );
  }

  try {
    Lisk.validator.validator.validateSchema(event.meta.params.request.params.schema);

    return true;
  } catch {
    return false;
  }
}

function parseWalletConnectUri(uri) {
  // Handle wc:{} and wc://{} format
  const str = uri.startsWith('wc://') ? uri.replace('wc://', 'wc:') : uri;
  const pathStart = str.indexOf(':');
  const pathEnd = str.indexOf('?') !== -1 ? str.indexOf('?') : undefined;
  const protocol = str.substring(0, pathStart);
  const path = str.substring(pathStart + 1, pathEnd);
  const requiredValues = path.split('@');

  const queryString = typeof pathEnd !== 'undefined' ? str.substring(pathEnd) : '';
  const queryParams = qs.parse(queryString);
  const result = {
    protocol,
    topic: requiredValues[0],
    version: parseInt(requiredValues[1], 10),
    symKey: queryParams.symKey,
    relay: parseRelayParams(queryParams),
    bridge: queryParams.bridge,
    key: queryParams.key,
    handshakeTopic: queryParams.handshakeTopic,
  };

  return result;
}

export function validateConnectionURI(uri) {
  const [protocol, ...rest] = uri.split(':');
  if (protocol !== 'wc' || rest.length > 1) {
    return false;
  }
  const result = parseWalletConnectUri(uri);

  return !(!result.topic || !result.symKey || !result.relay);
}
