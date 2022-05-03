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

    it('Should convert to string', () => {
        const date = new Date();

        let arranges = [
            {received: null, expect: "null"},
            {received: undefined, expect: "undefined"},
            {received: "", expect: ""},
            {received: "fake teste", expect: "fake teste"},
            {received: 0, expect: "0"},
            {received: 1, expect: "1"},
            {received: 5, expect: "5"},
            {received: true, expect: "true"},
            {received: false, expect: "false"},
            {received: date, expect: date.toString()},
            {received: {prop: "teste"}, expect: JSON.stringify({prop: "teste"})},
        ];

        let vo: any;

        arranges.forEach(value => {
            vo = new StubValueObject(value.received)
            expect(value.expect).toBe(vo.toString());
        })
    });

    it("Should be a immutable object", () => {
        let vo = new StubValueObject({ prop1: "value1", prop2: { prop3: new Date() } })

        expect(() => vo.value.prop1 = "teste").toThrow(
          "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );
    
        expect(() => (vo.value.prop2 = "teste")).toThrow(
          "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );
    
        expect(vo.value.prop2.prop3).toBeInstanceOf(Date)
      });
});
