export function deepFreeze<T>(obj: T) {
  if (obj !== undefined && obj !== null) {
    const propsNames = Object.getOwnPropertyNames(obj);

    for (const name of propsNames) {
      const value: any = obj[name as keyof T];
      if (value && typeof value === "object") {
        deepFreeze(value);
      }
    }
  }

  return Object.freeze(obj);
}
