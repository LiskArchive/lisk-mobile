// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import * as sendTokenHandlers from '../../src/modules/SendToken/mocks/handlers';
import * as transactionHandlers from '../../src/modules/Transactions/mocks/handlers';

const webSocketHandler = rest.get(
  '*/socket.io/',
  (_, res, ctx) => res(
    ctx.status(200),
    ctx.set('Connection', 'keep-alive'),
    ctx.set('Content-Type', 'text/event-stream'),
    ctx.body('data: SUCCESS\n\n'),
  ),
);

export default [
  ...Object.values(sendTokenHandlers),
  ...Object.values(transactionHandlers),
  webSocketHandler
];
