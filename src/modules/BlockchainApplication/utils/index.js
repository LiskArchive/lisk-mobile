/**
 * Access next and previous items of an array in a round form
 * If current item is the last item of the array, next item would be the first item;
 * Also, if current item is the first item, previous would be the last item
 * @param {Array} arr - Array of data
 * @param {Number} index - Current index of current active data
 * @param {'next' | 'prev'} direction - Direction to move pointer for next data
 * @returns {any} - arr[nextIndex]
 */
export const roundAccessor = (arr = [], index = 0, direction = 'next') => {
  if (direction === 'next') {
    return arr[index + 1] ? arr[index + 1] : arr[0]
  }
  return index === 0 ? arr[arr.length - 1] : arr[index - 1]
}
