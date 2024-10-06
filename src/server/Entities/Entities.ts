import type { Zombie } from "./Zombie";

const entitiesMap = new Map<Instance, Zombie>()

export function addEntity(istance: Instance, entity: Zombie) {
    entitiesMap.set(istance, entity)
}

export function getEntity(istance: Instance) {
    return entitiesMap.get(istance)
}