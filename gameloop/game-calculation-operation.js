export default class GameCalculationOperation {
    static ADD(base, value) {
        const actualValue = value?.getValue?.() ?? value ?? 0
        return base + actualValue
    }

    static SUBTRACT(base, value) {
        const actualValue = value?.getValue?.() ?? value ?? 0
        return base - actualValue
    }

    static MULTIPLY(base, value) {
        const actualValue = value?.getValue?.() ?? value ?? 0
        return base * actualValue
    }

    static DIVIDE(base, value) {
        const actualValue = value?.getValue?.() ?? value ?? 0
        return base / actualValue
    }
}