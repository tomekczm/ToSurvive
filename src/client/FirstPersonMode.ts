import { Players, Workspace } from "@rbxts/services"

const localPlayer = Players.LocalPlayer

export function isInFirstPerson() {
    const head = localPlayer.Character?.WaitForChild("Head") as Part
    return head.LocalTransparencyModifier === 1
}