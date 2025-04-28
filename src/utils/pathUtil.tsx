export function getParamsFromUrl(param: string) {
  const windowParameters = new URLSearchParams(window.location.search);
  return windowParameters.get(param);
}
