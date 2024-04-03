import { Players, RunService, Workspace } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const player = Players.LocalPlayer
const mouse = player.GetMouse()
const target = new Instance("Attachment")
target.Parent = Workspace.Terrain

export class PointAtAbility extends Ability<ClientItem> {
    constructor(item: ClientItem) {
        super(item);
        RunService.RenderStepped.Connect(() => {
            const character = player.Character
            if(!character) return
            const IKControl = character.FindFirstChild("IKControl") as IKControl
            IKControl.Target = target
            if(!IKControl) return
            target.Position = mouse.Hit.Position
        })
    }
}