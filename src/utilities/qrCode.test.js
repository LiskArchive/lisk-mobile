import * as qrCode from './qrCode';

describe('QR Code Helper', () => {
  it('decodes QR data that contains URL', () => {
    const data = 'lisk://wallet?recipient=1L&amount=1&reference=test';
    expect(qrCode.decodeAddress(data)).toEqual({
      address: '1L',
      amount: '1',
    });
  });

  it('decodes QR data just address', () => {
    const data = '1L';
    expect(qrCode.decodeAddress(data)).toEqual({
      address: data,
    });
  });
});
