export function resolvePromise(
  prms: Promise<any>,
  promiseState: { promise?: any; data?: any; error?: any },
) {
  // PERF: Optional if (promise is truthy) abort() to cancel the request and save bandwidth.
  promiseState.promise = prms;
  promiseState.data = null;
  promiseState.error = null;

  if (prms) prms.then(promiseSuccessACB).catch(errorACB);
  return;

  function promiseSuccessACB(promise: any) {
    // If statement to prevent race condition
    if (promiseState.promise === prms) promiseState.data = promise;
  }

  function errorACB(error: any) {
    // Prevent race condition here as well...
    if (promiseState.promise === prms) promiseState.error = error;
  }
}
