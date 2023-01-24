export const NETWORK = process.env.NETWORK || 'devnet';

export const API_BASE_URL = process.env.SERVICE_API_BASE_URL || 'http://localhost:9901';

export const WS_BASE_URL = process.env.SERVICE_WS_BASE_URL || 'wss://localhost:9901/blockchain';

export const API_VERSION = process.env.SERVICE_API_VERSION || 'v3';

export const API_URL = `/api/${API_VERSION}`;

export const METHOD = 'rest';

export const LIMIT = 20;
