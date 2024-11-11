import { Workspace } from "@rbxts/services"
const connections = new Map<Instance, Instance>();

// move this outside eventually.
export function connectElements(from: Instance, to: Instance) {
    connections.set(from, to);
}

export function getConnection(from: Instance) {
    return connections.get(from)
}

export function placeAndConnect(_target: unknown, _clone: unknown) {
    const clone = _clone as Model
    const target = _target as CFrame | BasePart

    const isInstance = typeIs(target, "Instance")

    const position = (isInstance) ? target.GetPivot() : target

    clone.PivotTo(position)
    clone.Parent = Workspace

    if(!isInstance)
        return

    if(target.Name !== "BuildingAttach") 
        return

    const model = target.FindFirstAncestorOfClass("Model")

    if(!model)
        return

    connectElements(model, clone)
}