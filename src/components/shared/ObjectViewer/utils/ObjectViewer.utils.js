export default function objectType(obj) {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
    return 'Iterable';
  }
  return Object.prototype.toString.call(obj).slice(8, -1);
}
