/* eslint-disable no-undef */

import { fromBaseToDisplayDenom } from './conversions.utils';

describe('conversion utils', () => {
  describe('fromBaseToDisplayDenom util', () => {
    const baseProps = {
      amount: BigInt(5000000),
      symbol: 'LSK',
      displayDenom: 'lsk',
      baseDenom: 'beddows',
      denomUnits: [
        {
          denom: 'beddows',
          decimals: 0,
          aliases: ['Beddows'],
        },
        {
          denom: 'lsk',
          decimals: 8,
          aliases: ['Lisk'],
        },
      ],
    };

    it('parses correctly a given amount and token', () => {
      const expectedAmount = '0.05';

      expect(fromBaseToDisplayDenom(baseProps)).toBe(expectedAmount);
    });

    it('adds the token symbol if specified on props', () => {
      const expectedAmount = '0.05 LSK';

      expect(fromBaseToDisplayDenom({ ...baseProps, withSymbol: true })).toBe(expectedAmount);
    });

    it('falls into error if specified display denom is not in units', () => {
      expect(() =>
        fromBaseToDisplayDenom({ ...baseProps, displayDenom: 'nonExistingDenom' })
      ).toThrow(Error);
    });
  });
});
