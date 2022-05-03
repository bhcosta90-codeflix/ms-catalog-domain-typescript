import InvalidUuidError from "../exceptions/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId", () => {
  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //   });

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
  afterEach(() => validateSpy.mockClear())

  it("Should throw error when uuid is invalid", () => {
    // const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("fake")).toThrow(InvalidUuidError);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("Should accept a uuid passed in constructor", () => {
    // const validateSpy = spyValidateMethod();
    const valueUUID = "491943b7-c176-4080-ba7d-69da2cc6d24c";
    const vo = new UniqueEntityId(valueUUID);
    expect(vo.id).toBe(valueUUID);

    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("Should accept a uuid not passed in constructor", () => {
    // const validateSpy = spyValidateMethod();
    const valueUUID = "491943b7-c176-4080-ba7d-69da2cc6d24c";
    const vo = new UniqueEntityId(valueUUID);
    expect(uuidValidate(vo.id)).toBeTruthy;
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
