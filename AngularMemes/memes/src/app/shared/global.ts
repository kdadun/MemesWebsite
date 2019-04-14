export class Global {

  constructor() {}

  public localStorageGetItem(key: string) {
      return localStorage.getItem(key);
  }
  public localStorageSetItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }
  public get<T>(key: string) {
    return localStorage.getItem(key);
  }
}
