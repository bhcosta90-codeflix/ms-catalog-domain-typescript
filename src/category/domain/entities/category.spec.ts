import { Category } from './category';

describe('Category Test', () => {
    test('constructor of category', () => {
        const category = new Category("movie")
        expect(category.name).toBe('movie1')
    })
})