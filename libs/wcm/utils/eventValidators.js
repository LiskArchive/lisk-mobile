import * as Lisk from '@liskhq/lisk-client';

import { EVENTS } from '../constants/lifeCycle';

export function validateConnectionNameSpace(event) {
  const isSessionProposal = event?.name === EVENTS.SESSION_PROPOSAL;

  if (!isSessionProposal) {
    throw new Error('Name space validation is only available for session_proposal events.');
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
    throw new Error('Connection event has no schema on params.');
  }

  try {
    Lisk.validator.validator.validateSchema(event.meta.params.request.params.schema);

    return true;
  } catch {
    return false;
  }
}
