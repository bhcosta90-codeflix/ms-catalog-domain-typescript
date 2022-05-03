import UniqueEntityId from "../domain/value-objects/unique-entity-id.vo";
import Entity from "./entity"
import {validate as uuidValidate} from 'uuid'

class StubEntity extends Entity<{prop1: string, prop2: Number}>{

}

describe("Entity Unit Test", () => {
    it('Should set props and id', () => {
        const arrange = {prop1: 'teste', prop2: 10};
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange)
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
        expect(entity.id).not.toBeNull()
        expect(uuidValidate(entity.id)).toBeTruthy()
    })

    it('Should accept a valid uuid', () => {
        const arrange = {prop1: 'teste', prop2: 10};
        const id = new UniqueEntityId()
        const entity = new StubEntity(arrange, id);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
        expect(entity.id).toBe(id.value)
    })

    it('Should convert entity to json', () => {
        const arrange = {prop1: 'teste', prop2: 10};
        const id = new UniqueEntityId()
        const entity = new StubEntity(arrange, id);
        expect(entity.toJSON()).toStrictEqual({
            id: id.value,
            ...arrange
        })
    })
})