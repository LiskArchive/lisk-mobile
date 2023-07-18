import { TOKEN_TRANSFER_VALIDATION_SCHEMA } from 'modules/Transactions/utils/constants';

export const WHITE_LISTED_DEEP_LINKS = [
  {
    pathRegex: /^\/\/wallet\/?$/,
    validationSchema: TOKEN_TRANSFER_VALIDATION_SCHEMA,
  },
];
