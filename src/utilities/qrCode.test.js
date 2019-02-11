import * as qrCode from './qrCode';

describe('QR Code Helper', () => {
  it('decodes QR data with URL that contains all fields', () => {
    const data = 'lisk://wallet?recipient=1L&amount=1&reference=test';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: '1L',
      amount: '1',
      reference: 'test',
    });
  });

  it('decodes QR data with recipient', () => {
    const data = 'lisk://wallet?recipient=1L';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: '1L',
      amount: '',
      reference: '',
    });
  });

  it('decodes QR data with recipient and amount', () => {
    const data = 'lisk://wallet?recipient=1L&amount=1';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: '1L',
      amount: '1',
      reference: '',
    });
  });

  it('decodes QR data that contains just the address', () => {
    const data = '1L';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: data,
    });
  });
});
