import GameValueContainer from "./game-value-container.js"

export default class GameState extends GameValueContainer{
    isRoot = true

    advance(time) {
        this.prepareAdvance(time)
        this.finalizeAdvance()
    }
}