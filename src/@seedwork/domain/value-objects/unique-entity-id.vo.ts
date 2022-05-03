import { v4 as uuid4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../../exceptions/invalid-uuid.error";
import ValueObject from "./value-objects";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuid4());
    this.validate();
  }

  private validate() {
    const valid = uuidValidate(this.value);

    if (!valid) {
      throw new InvalidUuidError();
    }
  }
}
