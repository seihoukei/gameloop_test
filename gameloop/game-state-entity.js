export default class GameStateEntity {
    #game = null
    #id = ""
    #path = ""
    #description = ""

    static getNewId() {
        return Math.random().toString(36).slice(2, 12)
    }

    static isValidId(id) {
        return typeof id === "string" && id.length > 0 && id.indexOf(".") === -1
    }

    constructor(game, id) {
        if (!GameStateEntity.isValidId(id)) {
            throw new Error(`Invalid id ${id}`)
        }
        this.#game = game
        this.#id = id
    }

    getId() {
        return this.#id
    }

    getFullId() {
        if (this.#path === "")
            return this.#id
        return this.#path + "." + this.#id
    }

    setPath(path) {
        this.#path = path
    }

    setDescription(description) {
        this.#description = description
        return this
    }

    getDescription() {
        return this.#description
    }
}