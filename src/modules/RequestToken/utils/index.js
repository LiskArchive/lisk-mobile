export const serializeQueryString = (obj) => {
  let str = '?';
  str += Object.keys(obj)
    .reduce((a, k) => {
      // eslint-disable-next-line no-unused-expressions
      obj[k] && a.push(`${k}=${encodeURIComponent(obj[k])}`);
      return a;
    }, [])
    .join('&');
  return str;
};
