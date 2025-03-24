import { resolvePromise } from "./utils/resolvePromise";

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {
  dummyData: 0,
  searchParams: {},
  searchResultsPromiseState: {},

  //currentDishPromiseState: {}, TODO: update for info relevant to our use case

  //setSearchQuery(query) {
  //  this.searchParams.query = query;
  //},

};

export function isPromiseResolved(model) {
  return (
    model.currentDishPromiseState.promise &&
    model.currentDishPromiseState.data &&
    !model.currentDishPromiseState.error
  );
}
