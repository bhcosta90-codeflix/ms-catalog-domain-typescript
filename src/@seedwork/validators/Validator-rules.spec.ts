import ValidationError from "../exceptions/validation-error";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExceptedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function assertIsInvalid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExceptedRule) {
  expect((): ValidatorRules => {
    const validator: ValidatorRules = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
    return validator;
  }).toThrow(error);
}

function assertIsValid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExceptedRule) {
  expect((): ValidatorRules => {
    const validator: ValidatorRules = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
    return validator;
  }).not.toThrow(error);
}

describe("ValidatorRules Unit Test", () => {
  test("Values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("Required validation rule", () => {
    const rule: keyof ValidatorRules = "required";

    let arranges: Values[] = [
      { value: "", property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field is required"),
      });
    });

    arranges = [
      { value: "teste", property: "field" },
      { value: 5, property: "field" },
      { value: true, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field is required"),
      });
    });
  });

  test("String validation rule", () => {
    const rule: keyof ValidatorRules = "string";

    let arranges: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
      { value: null, property: "field" },
      { value: undefined, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field must be a string"),
      });
    });

    arranges = [
      { value: "teste", property: "field" },
      { value: "", property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field is required"),
      });
    });
  });

  test("Max length validation rule", () => {
    const rule: keyof ValidatorRules = "maxLength";

    let arranges: Values[] = [
      { value: "teste", property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field must be less or equal than 4 characters"),
        params: [4]
      });
    });

    arranges = [
        { value: "test", property: "field" },
    ];

    arranges.forEach(function (item: any): void {
        assertIsValid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field must be less or equal than 4 characters"),
        params: [4]
      });
    });
  });
});
