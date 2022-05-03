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

function assertIsInvalid(expected: ExceptedRule) {
  expect((): ValidatorRules => {
    return runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExceptedRule) {
  expect((): ValidatorRules => {
    return runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExceptedRule, "erro">): ValidatorRules {
  const validator: ValidatorRules = ValidatorRules.values(value, property);
  const method = validator[rule];
  method.apply(validator, params);
  return validator;
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
      { value: undefined, property: "field" },
      { value: null, property: "field" },
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

    let arranges: Values[] = [{ value: "teste", property: "field" }];

    arranges.forEach(function (item: any): void {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError(
          "The field must be bigger or equal than 4 characters"
        ),
        params: [4],
      });
    });

    arranges = [
      { value: "test", property: "field" },
      { value: undefined, property: "field" },
      { value: null, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError(
          "The field must be bigger or equal than 4 characters"
        ),
        params: [4],
      });
    });
  });

  test("Min length validation rule", () => {
    const rule: keyof ValidatorRules = "minLength";

    let arranges: Values[] = [{ value: "te", property: "field" }];

    arranges.forEach(function (item: any): void {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError(
          "The field must be less or equal than 4 characters"
        ),
        params: [4],
      });
    });

    arranges = [
      { value: "testee", property: "field" },
      { value: undefined, property: "field" },
      { value: null, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError(
          "The field must be less or equal than 4 characters"
        ),
        params: [4],
      });
    });
  });

  test("Boolean validation rule", () => {
    const rule: keyof ValidatorRules = "boolean";

    let arranges: Values[] = [
      { value: "teste", property: "field" },
      { value: 5, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field must be a boolean"),
      });
    });

    arranges = [
      { value: undefined, property: "field" },
      { value: null, property: "field" },
      { value: true, property: "field" },
      { value: false, property: "field" },
    ];

    arranges.forEach(function (item: any): void {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule,
        error: new ValidationError("The field must be a boolean"),
      });
    });
  });

  it("Should throw a validation error when combine two or more validation rules", () => {
    let validator: ValidatorRules;

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      "The field is required"
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      "The field must be a string"
    );

    validator = ValidatorRules.values("aaaaaa", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      "The field must be bigger or equal than 5 characters"
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      "The field is required"
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string().minLength(5)).toThrow(
      "The field must be a string"
    );

    validator = ValidatorRules.values("aaa", "field");
    expect(() => validator.required().string().minLength(5)).toThrow(
      "The field must be less or equal than 5 characters"
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().boolean()).toThrow(
      "The field is required"
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().boolean()).toThrow(
      "The field must be a boolean"
    );
  });

  it("Should valid when combine two or more validation rule", () => {
    expect.assertions(0)

    ValidatorRules.values("teste", "field").required().string();
    ValidatorRules.values("teste", "field").required().string().maxLength(5);
    ValidatorRules.values("teste", "field").required().string().minLength(5);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  })
});
