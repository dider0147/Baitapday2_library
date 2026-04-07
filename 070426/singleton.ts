export default class Singleton<T> {
  protected static instance: Singleton<any>;

  protected constructor() {}

  public static getInstance<T>(): Singleton<T> {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton<T>();
    }
    return Singleton.instance;
  }
}