export function getDiscreteModeDataSize(data) {
  let dataSize = '';
  const _data = typeof data !== 'string' ? data.toString() : data;

  if (_data.length <= 4) {
    dataSize = 'Small';
  } else if (_data.length > 4 && _data.length <= 8) {
    dataSize = 'Medium';
  } else {
    dataSize = 'Big';
  }

  return dataSize;
}
