export abstract class SingletonBase {
  private static instances: Map<Function, any> = new Map();

  public constructor() {
  }

  public static getInstance<T extends SingletonBase>(this: new () => T): T {
    const targetClass = this;
    if (!SingletonBase.instances.has(targetClass)) {
      SingletonBase.instances.set(targetClass, new targetClass());
    }
    return SingletonBase.instances.get(targetClass);
  }
}