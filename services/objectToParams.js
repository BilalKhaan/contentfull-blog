export default function objectToParams(object) {
  return `?${Object.keys(object)
    .filter(key => !!object[key])
    .map(key => `${key}=${encodeURIComponent(object[key])}`)
    .join('&')}`;
}