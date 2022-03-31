import GameStateEntity from "./game-state-entity.js"

export default class GameCalculatedValue extends GameStateEntity {
    #base = null
    #operations = []
    #value = null
    #valueTime = 0
    
    setBase(base) {
        this.#base = base
    }
    
    getBase() {
        return this.#base
    }
    
    addOperation(operation, argument = 0) {
        this.#operations.push({operation, argument})
        return this
    }
    
/*
    removeOperation(operation) {
        this.#operations.splice(this.#operations.indexOf(operation), 1)
        return this
    }
*/

    getValue() {
        if (this._game.time === this.#valueTime) {
            return this.#value
        }

        this.#value = this.#base?.getValue?.() ?? this.#base ?? 0
        
        for (let {operation, argument} of this.#operations) {
            this.#value = operation(this.#value, argument)
        }

        this.#valueTime = this._game.time

        return this.#value
    }

    debugInfo() {
        return `${this.getDescription()} = ${this.getValue().toFixed(2)} (${this.getFullId()    })`
    }
}