import { Players, RunService } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const player = Players.LocalPlayer
const mouse = player.GetMouse()

export class RotateAbility extends Ability<ClientItem> {

    event: RBXScriptConnection | undefined

    constructor(item: ClientItem) {
        super(item);
        item.equipEvent.Connect(() => {
            this.event = RunService.RenderStepped.Connect(() => {
                const character = player.Character
                if(!character) return
                const pivot = character.GetPivot()
                const lookAt = new Vector3(mouse.Hit.X, pivot.Y, mouse.Hit.Z)
                character.PivotTo(CFrame.lookAt(pivot.Position, lookAt))
            })
        })

        item.unequipEvent.Connect(() => {
            this.event?.Disconnect()
        })
    }
}