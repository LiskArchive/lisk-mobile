// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';

import { sendTokenMockHandlers } from './handlers';

export const server = setupServer(...sendTokenMockHandlers);
