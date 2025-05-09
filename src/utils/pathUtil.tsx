export function getParamsFromUrl(param: string) {
  const windowParameters = new URLSearchParams(window.location.search)
  return windowParameters.get(param)
}

export function urlContains(param: string) {
  const windowParams = new URLSearchParams(window.location.search)
  return windowParams.has(param)

}
