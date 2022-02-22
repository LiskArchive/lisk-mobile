const errorMap = {
  'minimum remaining balance requirement': 'Recipient account does not meet 0.05LSK miminum balance requirement',
};

const errorKeys = Object.keys(errorMap);

const getResponseMessage = response => {
  if (response.message?.includes(':')) {
    const errorParts = response.message.split(':');
    return errorParts.slice(1, errorParts.length).join('').trim();
  }
  if (response.message) {
    return response.message;
  }
  return 'Failed to send transactions to server.';
};

const errorHandler = (response) => {
  const responseMessage = getResponseMessage(response);
  const errorKey = errorKeys.filter(key => responseMessage.includes(key))[0];
  if (errorKey) {
    return errorMap[errorKey];
  }
  return responseMessage;
};

export default errorHandler;
