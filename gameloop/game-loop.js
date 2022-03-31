import GameState from "./game-state.js"

export default class GameLoop {
    MAX_ITERATIONS = 100

    #rate = 10
    #timeout = null
    running = false
    #lastTick = 0
    time = 0
    targetTime = 0
    speedMultiplier = 1

    state = new GameState(this, "state")

    preStepFunction = null
    postStepFunction = null

    constructor(rate = 10) {
        this.#rate = rate
    }

    start(rate = this.#rate) {
        if (this.running)
            this.stop()

        this.running = true
        this.#rate = rate
        this.#lastTick = performance.now()

        this.#tick()
    }

    stop() {
        clearTimeout(this.#timeout)
        this.#timeout = null
        this.running = false
    }

    #tick() {
        const now = performance.now()
        const deltaTime = now - this.#lastTick
        this.#lastTick = now

        this.advance(deltaTime)

        this.#timeout = setTimeout(() => {
            this.#tick()
        }, 1000 / this.#rate)
    }

    advance(time = 0) {
        this.targetTime += time / 1000 * this.speedMultiplier

        let iterations = 0
        while (this.time < this.targetTime && iterations < this.MAX_ITERATIONS) {
            iterations++

            const stepTime = this.#getStepTime()
            this.#processStep(stepTime)
        }
    }

    #getStepTime() {
        const maxStep = this.targetTime - this.time
        return maxStep > 0 ? maxStep : 0
    }

    #processStep(stepTime) {
        this.preStepFunction?.(stepTime)

        this.state.prepareAdvance(stepTime)
        this.time += stepTime
        this.state.finalizeAdvance()

        this.postStepFunction?.(stepTime)
    }

    setPreStepFunction(func) {
        this.preStepFunction = func
    }

    setPostStepFunction(func) {
        this.postStepFunction = func
    }

}
