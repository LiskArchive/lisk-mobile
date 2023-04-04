import {
  fromBaseToDisplayDenom,
  fromDisplayToBaseDenom,
  fromBeddowsToLsk,
  fromLskToBeddows,
} from './conversions.utils';

describe('conversion utils', () => {
  describe('fromBaseToDisplayDenom', () => {
    const baseProps = {
      amount: '5000000',
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

  describe('fromDisplayToBaseDenom', () => {
    const denomUnits = [
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
    ];

    it('should convert from display to base denomination correctly', () => {
      const displayAmount = '0.05';
      const displayDenom = 'lsk';

      const result = fromDisplayToBaseDenom({
        amount: displayAmount,
        displayDenom,
        denomUnits,
      });

      expect(result).toEqual('5000000');
    });

    it('should throw an error if display denomination is not found', () => {
      const displayAmount = '0.05';
      const displayDenom = 'nonexistent';

      expect(() => {
        fromDisplayToBaseDenom({
          amount: displayAmount,
          displayDenom,
          denomUnits,
        });
      }).toThrow('Display denomination not found on units.');
    });
  });

  describe('fromBeddowsToLsk', () => {
    it('parses correctly a given amount from Beddows to LSK', () => {
      const paramAmount = '5000000';
      const expectedAmount = '0.05';

      expect(fromBeddowsToLsk(paramAmount)).toBe(expectedAmount);
    });

    it('adds the token symbol if specified on props', () => {
      const paramAmount = '1000000';
      const expectedAmount = '0.01 LSK';

      expect(fromBeddowsToLsk(paramAmount, true)).toBe(expectedAmount);
    });
  });

  describe('fromLskToBeddows', () => {
    it('parses correctly a given amount from LSK to Beddows', () => {
      const paramAmount = '0.05';
      const expectedAmount = '5000000';

      expect(fromLskToBeddows(paramAmount)).toBe(expectedAmount);
    });
  });
});
