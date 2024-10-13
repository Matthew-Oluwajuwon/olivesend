/**
 *
 *  This class defines how the state is updated when the dispatch function is called, 
 *  for instance you can check the pages slice in the slices folder and custom hooks in the custom hooks folder
 *
 *  */
export class AppPayload<T, K extends keyof T> {
  key: K;
  value: T[K];
  constructor(key: K, value: T[K]) {
    this.key = key;
    this.value = value;
  }
}
