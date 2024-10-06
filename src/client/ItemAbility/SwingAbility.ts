import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox";
import { Players, UserInputService } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

export class SwingAbility extends Ability<ClientItem> {
    connection: RBXScriptConnection | undefined;
    connectionAttribute: RBXScriptConnection | undefined
    raycastHitbox!: HitboxObject;


    canSwing() {
        return !this.item.item.GetAttribute("SwingDelay") && UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)
    }

    localSwing() {}

    onStart(): void {
        super.onStart()

        this.item.unequipEvent.Connect(() => {
            this.connection?.Disconnect()
            this.connectionAttribute?.Disconnect()
        })

        this.item.equipEvent.Connect(() => {
            const physicalItem = this.item.item
            this.connection = Players.LocalPlayer.GetMouse().Button1Down.Connect(() => {
                this.localSwing()
                this.item.invokeEvent("Swing")
            })
            this.connectionAttribute = physicalItem.GetAttributeChangedSignal("SwingDelay").Connect(() => {
                if(this.canSwing()) {
                    this.localSwing()
                    this.item.invokeEvent("Swing")
                }
            })
        })
    }
}