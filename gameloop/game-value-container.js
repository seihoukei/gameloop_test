import GameStateEntity from "./game-state-entity.js"
import GameValue from "./game-value.js"

export default class GameValueContainer extends GameStateEntity {
    values = {}
    containers = {}
    isRoot = false


    createValue(description = "", id = GameStateEntity.getNewId, defaultValue = 0) {
        if (this.values[id]) {
            throw new Error(`Value with id ${id} already exists`)
        }

        const value = new GameValue(this, id)
        value.setDescription(description)
        value.setValue(defaultValue)
        if (!this.isRoot)
            value.setPath(this.getFullId())

        this.values[id] = value

        return value
    }

    createContainer(description = "", id = GameStateEntity.getNewId) {
        if (this.containers[id]) {
            throw new Error(`Container with id ${id} already exists`)
        }

        const container = new GameValueContainer(this, id)
        container.setDescription(description)
        if (!this.isRoot)
            container.setPath(this.getFullId())

        this.containers[id] = container

        return container
    }

    getValue(id, object = false) {
        const periodPosition = id.indexOf(".")
        let value = null

        if (periodPosition === -1)
            value = this.values[id]
        else {
            const containerId = id.substring(0, periodPosition)
            const container = this.containers[containerId]
            if (container === null)
                return null

            const valueId = id.substring(periodPosition + 1)
            value = container.getValue(valueId, true)
        }

        if (object)
            return value

        return value?.getValue() ?? null
    }

    getContainer(id) {
        const periodPosition = id.indexOf(".")

        if (periodPosition === -1)
            return this.containers[id] ?? null
        else {
            const subContainerId = id.substring(0, periodPosition)
            const subContainer = this.containers[subContainerId]
            if (subContainer === null)
                return null

            const containerId = id.substring(periodPosition + 1)
            return subContainer.getContainer(containerId)
        }
    }

    prepareAdvance(time) {
        for (const value of Object.values(this.values)) {
            value.prepareAdvance(time)
        }

        for (const container of Object.values(this.containers)) {
            container.prepareAdvance(time)
        }
    }

    finalizeAdvance() {
        for (const value of Object.values(this.values)) {
            value.finalizeAdvance()
        }

        for (const container of Object.values(this.containers)) {
            container.finalizeAdvance()
        }
    }
}