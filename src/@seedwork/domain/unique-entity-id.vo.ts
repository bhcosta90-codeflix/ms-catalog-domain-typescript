import { v4 as uuid4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../exceptions/invalid-uuid.error";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuid4();
    this.validate();
  }

  private validate() {
    const valid = uuidValidate(this.id);

    if (!valid) {
      throw new InvalidUuidError();
    }
  }
}
