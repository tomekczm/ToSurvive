import type { InteractsWithPlayer } from "./InteractsWithPlayer";

const entitiesMap = new Map<Instance, InteractsWithPlayer>()

export function addEntity(istance: Instance, entity: InteractsWithPlayer) {
    entitiesMap.set(istance, entity)
}

export function getEntity(istance: Instance) {
    return entitiesMap.get(istance)
}