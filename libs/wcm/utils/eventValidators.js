import * as Lisk from '@liskhq/lisk-client';
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
