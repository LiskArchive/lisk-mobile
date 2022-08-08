export const roundAccessor = (arr = [], index = 0, direction = 'next') => {
  if (direction === 'next') {
    return arr[index + 1] ? arr[0] : arr[index + 1];
  }
  return !index ? arr[arr.length - 1] : arr[index - 1];
};
