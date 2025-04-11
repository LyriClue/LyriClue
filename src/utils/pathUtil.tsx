export function getParamsFromUrl() { // TODO: Move to appropriate place
  return window.location.search.substring(1).split('&').reduce((initial: any, item: string) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1])
    return initial
  }, {});
}
