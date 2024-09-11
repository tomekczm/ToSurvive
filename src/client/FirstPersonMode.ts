import { Players, Workspace } from "@rbxts/services"

const localPlayer = Players.LocalPlayer

export function isInFirstPerson() {
    return localPlayer.DistanceFromCharacter(Workspace.CurrentCamera!.CFrame.Position) < 1
}