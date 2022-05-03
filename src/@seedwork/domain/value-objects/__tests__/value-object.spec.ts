import ValueObject from "./../value-objects"

class StubValueObject extends ValueObject {
    
}

describe("ValueObject Unit Teste", () => {
    it('Should set value', () => {
        let vo = new StubValueObject('teste');
        expect(vo.value).toBe('teste');

        vo = new StubValueObject({prop: "value"});
        expect(vo.value).toStrictEqual({prop: "value"});
    });
});
