import { Category } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "./../../../@seedwork/domain/value-objects/unique-entity-id.vo";

describe("Category Test", () => {
  test("constructor of category", () => {
    const created_at = new Date();

    const category = new Category({
      name: "movie",
      description: "description",
      active: true,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "movie",
      description: "description",
      active: true,
      created_at,
    });
  });

  test("properties of category", () => {
    let category = new Category({
      name: "movie",
    });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "movie",
      description: null,
      active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    /** */
    let created_at = new Date();
    category = new Category({
      name: "movie",
      description: "teste",
      active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "movie",
      description: "teste",
      active: false,
      created_at,
    });

    /** */
    category = new Category({
      name: "movie 2",
      description: "teste 2",
    });
    expect(category.props).toMatchObject({
      name: "movie 2",
      description: "teste 2",
    });

    /** */
    category = new Category({
      name: "movie 2",
      active: true,
    });
    expect(category.props).toMatchObject({
      name: "movie 2",
      active: true,
    });

    /** */
    created_at = new Date();
    category = new Category({
      name: "movie 2",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "movie 2",
      created_at,
    });
  });
  test("getter of name prop", () => {
    const category = new Category({
      name: "movie",
    });
    expect(category.name).toBe("movie");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({
      name: "movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "movie",
      description: "some description",
    });
    expect(category.description).toBe("some description");

    category = new Category({
      name: "movie",
    });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull;
  });

  test("getter and setter of active prop", () => {
    let category = new Category({
      name: "movie",
    });
    expect(category.active).toBeTruthy();

    category = new Category({
      name: "movie",
      active: true,
    });
    expect(category.active).toBeTruthy();

    category = new Category({
      name: "movie",
      active: false,
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "movie",
    });
    category["active"] = false;
    expect(category.description).toBeNull();
  });

  test("getter and setter of create_at prop", () => {
    let category = new Category({
      name: "movie",
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at);
  });

  test("id field", () => {
    let category = new Category({
      name: "movie",
    });
    expect(category.id).not.toBeNull()

    category = new Category({
      name: "movie",
    }, null);
    expect(category.id).not.toBeNull()

    const uuid = new UniqueEntityId("63d38916-93d0-45c6-946d-f9da63dcfb5d")
    category = new Category({
      name: "movie",
    }, uuid);

    expect(category.id).toBe(uuid.value)
  })

  test('Should update a category', () => {
    const category = new Category({
      name: "movie",
    });

    category.update('test', 'test description');
    expect(category.name).toBe('test')
    expect(category.description).toBe('test description')
  })

  test('Should activate a category', () => {
    const category = new Category({
      name: "movie",
      active: false
    });

    category.activate();
    expect(category.active).toBeTruthy()
  })

  test('Should deactivate a category', () => {
    const category = new Category({
      name: "movie",
    });

    category.deactivate();
    expect(category.active).toBeFalsy()
  })
});
