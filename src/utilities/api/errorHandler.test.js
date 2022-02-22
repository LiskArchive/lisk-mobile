import errorHandler, { errorMap } from './errorHandler';

describe('errorHandler', () => {
  it('should map error message returned from server', () => {
    const result = errorHandler({ message: 'Transaction payload was rejected by the network node: Recipient account 3d943a7de8202872de1a0dd6e40dbdcb99d39c3a does not meet the minimum remaining balance requirement: 5000000' });
    expect(result).toEqual(errorMap['minimum remaining balance requirement']);
  });
  it('should return error message from server if not mapped', () => {
    const result = errorHandler({ message: 'Unmapped error message' });
    expect(result).toEqual('Unmapped error message');
  });
  it('should return fallback error message if no error message is sent from server', () => {
    const result = errorHandler({ });
    expect(result).toEqual('Failed to send transactions to server.');
  });
});
