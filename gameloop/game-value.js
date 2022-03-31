import GameStateEntity from "./game-state-entity.js"

export default class GameValue extends GameStateEntity{
    #value = 0
    #nextValue = 0
    #derivative = null

    getValue() {
        return this.#value
    }

    setValue(value) {
        this.#value = value
        return this
    }

    setDerivative(derivative) {
        this.#derivative = derivative
        return this
    }

    hasDerivative() {
        return this.#derivative !== null
    }

    getDerivative() {
        return this.#derivative
    }

    #getChange(time) {
        if (!this.hasDerivative())
            return 0

        if (typeof this.#derivative === "number")
            return this.#derivative * time

        return this.#derivative.getValue?.() * time ?? 0
    }

    prepareAdvance(time) {
        const change = this.#getChange(time)
        this.#nextValue = this.#value + change
        return this
    }

    finalizeAdvance() {
        this.setValue(this.#nextValue)
        return this
    }

    debugInfo() {
        return `${this.getDescription()} = ${this.#value.toFixed(2)} (${this.getFullId()    })`
    }
}