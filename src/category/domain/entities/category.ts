import {v4 as uuid4} from 'uuid'

export type CategoryType = {
  name: string;
  description?: string;
  active?: boolean;
  created_at?: Date;
};

export class Category {
  public readonly id: string;

  constructor(public readonly props: CategoryType, id?: string) {
    this.id = id || uuid4()
    this.description = this.props.description;
    this.active = this.props.active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get active() {
    return this.props.active;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set description(value: string|null) {
    this.props.description = value ?? null;
  }

  private set active(value: boolean|null) {
    this.props.active = value ?? true;
  }
}
