import { Players, RunService } from "@rbxts/services"
import { addKeyHint } from "./KeyHint"

export let areHintsOn = true

if(areHintsOn) {
    const lockUnlock = addKeyHint("Q", "Lock/unlock mouse")
    addKeyHint("E", "Inventory")

    RunService.RenderStepped.Connect(() => {
        lockUnlock.Visible = Players.LocalPlayer.inFirstPerson
    })
}