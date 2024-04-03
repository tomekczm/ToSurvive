import { Players } from "@rbxts/services"

const localPlayer = Players.LocalPlayer

export function onCharacterAdded(input: (model: Model) => void) {
    if(localPlayer.Character) input(localPlayer!.Character)

    localPlayer.CharacterAdded.Connect((model) => input(model))
}