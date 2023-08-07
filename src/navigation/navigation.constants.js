import { TOKEN_TRANSFER_VALIDATION_SCHEMA } from 'modules/Transactions/utils/constants';

export const WHITE_LISTED_DEEP_LINKS = [
  {
    pathRegex: /^\/\/wallet\/?$/,
    validationSchema: TOKEN_TRANSFER_VALIDATION_SCHEMA,
    paramsTransformer: (queryParams) => {
      let result = queryParams;

      if (!queryParams.amount) {
        result = { ...result, amount: '0' };
      }

      if (!queryParams.reference) {
        result = { ...result, reference: '' };
      }

      return result;
    },
  },
];
