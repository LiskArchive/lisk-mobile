export const errorMap = {
  'minimum remaining balance requirement':
    'Recipient account does not meet 0.05LSK miminum balance requirement',
  'nonce is lower than account nonce': 'Please wait until previous transaction is confirmed',
}

const errorKeys = Object.keys(errorMap)

const getResponseMessage = (response) => {
  if (response.message) {
    return response.message
  }
  return 'Failed to send transactions to server.'
}

const errorHandler = (response) => {
  const responseMessage = getResponseMessage(response)
  const errorKey = errorKeys.filter((key) => responseMessage.includes(key))[0]
  if (errorKey) {
    return errorMap[errorKey]
  }
  return responseMessage
}

export default errorHandler
