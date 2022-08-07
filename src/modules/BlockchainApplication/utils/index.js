export const roundAccessor = (arr = [], i, direction = 'next') => {
  const index = i || 0;
  if (direction === 'next') {
    if (arr[index + 1] === undefined) {
      return arr[0];
    }
    return arr[index + 1];
  }
  if (index === 0) {
    return arr[arr.length - 1];
  }
  return arr[index - 1];
};
