import InvalidUuidError from "../exceptions/invalid-uuid.error"
import UniqueEntityId from "./unique-entity-id.vo"

describe('UniqueEntityId', () => {
    it('Should throw error when uuid is invalid', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
        expect(() => new UniqueEntityId('fake')).toThrow(InvalidUuidError)
        expect(validateSpy).toHaveBeenCalled()
    })
})