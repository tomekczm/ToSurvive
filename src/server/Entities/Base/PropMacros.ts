import { $definePropMacros } from "rbxts-transformer-macros"
import { entitiesMap } from "./Entities"

function getHumanoid(model: Instance) {
    return model.FindFirstChildOfClass("Humanoid") as Humanoid
}

export const ENTITY_PROPS = $definePropMacros<Entity>({
    alive(): boolean {
        return getHumanoid(this).Health !== 0
    },
    controller(): EntityController {
        return entitiesMap.get(this) as EntityController
    }
})