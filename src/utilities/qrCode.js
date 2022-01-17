// eslint-disable-next-line import/prefer-default-export
export const decodeLaunchUrl = data => {
  const recipientReg = /\?recipient=([^&]+)&/;
  const amountReg = /amount=(\d+)\.?(\d+)?/;
  const referenceReg = /reference=.*$/;
  const liskProtocolReg = /^[l|L]isk:\/\//;

  if (liskProtocolReg.test(data) && recipientReg.test(data)) {
    const address = data.match(recipientReg)[1];
    const amount = data.match(amountReg)
      ? data.match(amountReg)[0].replace('amount=', '')
      : '';
    const reference = data.match(referenceReg)
      ? window.decodeURIComponent(data.match(referenceReg)[0].replace('reference=', ''))
      : '';

    return { address, amount, reference };
  }

  return { address: data || '' };
};
