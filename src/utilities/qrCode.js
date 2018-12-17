// eslint-disable-next-line import/prefer-default-export
export const decodeLaunchUrl = (data) => {
  const recipientReg = /recipient=\d{1,21}L/;
  const amountReg = /amount=(\d+)\.?(\d+)?/;
  const liskProtocolReg = /^[l|L]isk:\/\//;

  if (liskProtocolReg.test(data) && recipientReg.test(data)) {
    const address = data.match(recipientReg)[0].replace('recipient=', '') || '';
    const amount = data.match(amountReg)[0].replace('amount=', '') || '';
    return ({ address, amount });
  }

  return ({ address: data || '' });
};
