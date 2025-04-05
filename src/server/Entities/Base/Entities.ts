export function isEntity(entity: Instance): entity is Entity {
    return entitiesMap.get(entity) !== undefined
}

export const entitiesMap = new Map<Instance, EntityController>()

export function addEntity(istance: Instance, entity: EntityController) {
    entitiesMap.set(istance, entity)
}
