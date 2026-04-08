export abstract class SingletonBase {
  private static _instances = new Map<any, any>();

  protected constructor() {
  }

  public static getInstance<T extends SingletonBase>(this: any): T {
    if (!SingletonBase._instances.has(this)) {
      SingletonBase._instances.set(this, new this());
    }
    return SingletonBase._instances.get(this);
  }
}