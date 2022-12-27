export function getDiscreteModeDataSize({ blurVariant, data }) {
  let dataSize = '';

  switch (blurVariant) {
    case 'incoming':
    case 'outgoing':
      dataSize = data.length > 2 ? 'Medium' : 'Small';
      break;

    case 'balance':
      if (data.length <= 2) {
        dataSize = 'Small';
      } else if (data.length > 2 && data.length < 6) {
        dataSize = 'Medium';
      } else {
        dataSize = 'Big';
      }
      break;

    default:
      dataSize = 'Small';
  }

  return dataSize;
}
