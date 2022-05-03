import { deepFreeze } from "./object";

describe("Object Unit Test", () => {
  it("Should not freeze a scalar value", () => {
    const deepFreezeTrue = deepFreeze(true);
    expect(typeof deepFreezeTrue).toBe("boolean");

    const deepFreezeFalse = deepFreeze(false);
    expect(typeof deepFreezeFalse).toBe("boolean");

    const deepFreezeNumber = deepFreeze(5);
    expect(typeof deepFreezeNumber).toBe("number");

    const deepObject = deepFreeze({
      prop1: "value1",
      prop2: { prop3: new Date() },
    });
    expect(typeof deepObject).toBe("object");
  });

  it("Should be a immutable object", () => {
    const deep = deepFreeze({ prop1: "value1", prop2: { prop3: new Date() } });
    expect(() => ((deep as any).prop1 = "teste")).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => ((deep as any).prop2 = "teste")).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(deep.prop2.prop3).toBeInstanceOf(Date)
  });
});
