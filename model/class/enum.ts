export class Enum {

    [index: string]: any

    protected map: Map<string, string>

    updateMap(property: string, text: string) {
        if (!this.map) this.map = new Map<string, string>()
        this.map.set(property, text)
    }

    getNames() {
        return Array.from(this.map.keys())
    }

    getTexts() {
        return Array.from(this.map.values())
    }

    getTextByName(name: string) {
        return this.map.get(name)
    }

    getTextByValue(value: number) {
        const name = this.getNames().find(name => this[name] === value)
        return this.map.get(name)
    }
}

export function desc(text: string) {
    return function actual<T extends Enum>(target: T, property: string) {
        target.updateMap(property, text)
    }
}
