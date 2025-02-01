import { RunService } from "@rbxts/services"
import { addKeyHint } from "./KeyHint"
import { isInFirstPerson } from "client/FirstPersonMode"

export let areHintsOn = true

if(areHintsOn) {
    const lockUnlock = addKeyHint("Q", "Lock/unlock mouse")
    addKeyHint("E", "Inventory")

    RunService.RenderStepped.Connect(() => {
        lockUnlock.Visible = !isInFirstPerson()
    })
}