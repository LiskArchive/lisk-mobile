import { tokenMap } from 'constants/tokens';
import getMappedFunction from './functionMapper';

describe('api/functionMapper', () => {
  it('throws error for non-existing functions', () => {
    expect(() =>
      getMappedFunction(tokenMap.LSK.key, 'account', 'unMappableFunction')).toThrow();
  });
});
