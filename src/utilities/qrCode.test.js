import * as qrCode from './qrCode';

describe('QR Code Helper', () => {
  it('decodes QR data that contains URL', () => {
    const data = 'lisk://wallet?recipient=1L&amount=1&reference=test';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: '1L',
      amount: '1',
      reference: 'test',
    });
  });

  it('decodes QR data that contains URL and reference with space', () => {
    const data = 'lisk://wallet?recipient=1L&amount=1&reference=test%20mobile';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: '1L',
      amount: '1',
      reference: 'test mobile',
    });
  });

  it('decodes QR data just address', () => {
    const data = '1L';
    expect(qrCode.decodeLaunchUrl(data)).toEqual({
      address: data,
    });
  });
});
