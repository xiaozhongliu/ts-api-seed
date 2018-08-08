import { Enum } from '../model'
const { Gender } = Enum

describe('enum tests', () => {

    it('getNames()      ', () => {
        const data = Gender.getNames()
        expect(data.length).toBe(3)
        expect(data[0]).toBe('Unknow')
    })

    it('getTexts()      ', () => {
        const data = Gender.getTexts()
        expect(data.length).toBe(3)
        expect(data[0]).toBe('未知')
    })

    it('getTextByName() ', () => {
        const data = Gender.getTextByName('Male')
        expect(data).toBe('男性')
    })

    it('getTextByValue()', () => {
        const data = Gender.getTextByValue(Gender.Female)
        expect(data).toBe('女性')
    })
})
