import GameLoop from "../../gameloop/game-loop.js"

window.onload = () => {
    const game = new GameLoop()

    const o1 = game.state.createContainer("Object 1", "object1")
    const o1a = o1.createValue("Growth", "growth", 0)
    const o1b = o1.createValue("Size", "size", 0)
    o1a.setDerivative(1)
    o1b.setDerivative(o1a)

    const o2 = game.state.createContainer("Object 2", "object2")
    const o2a = o2.createValue("Growth", "growth", 0)
    const o2b = o2.createValue("Size", "size", 0)
    o2a.setDerivative(0.5)
    o2b.setDerivative(o2a)

    game.setPostStepFunction(() => {
        document.body.innerText = `
        ${game.time.toFixed(2)}
        ${game.state.getValue("object1.growth", true).debugInfo()}
        ${game.state.getContainer("object1").getValue("size", true).debugInfo()}
        ${o2a.debugInfo()}
        ${o2b.debugInfo()}
        `
    })

    game.start()
}