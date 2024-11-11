import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox";
import { Players, UserInputService } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

export class SwingAbility extends Ability<ClientItem<Model>> {
    connection: RBXScriptConnection | undefined;
    connectionAttribute: RBXScriptConnection | undefined
    raycastHitbox!: HitboxObject;


    canSwing() {
        return !this.item.item.GetAttribute("SwingDelay") && UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)
    }

    localSwing() {}

    onNoLongerSwinging() {}

    onStart(): void {
        super.onStart()

        this.item.unequipEvent.Connect(() => {
            this.connection?.Disconnect()
            this.connectionAttribute?.Disconnect()
        })

        this.item.equipEvent.Connect(() => {
            const physicalItem = this.item.item
            const instance = this.item.item;
            this.connection = Players.LocalPlayer.GetMouse().Button1Down.Connect(() => {
                if(instance.GetAttribute("IsAiming")) return
                this.localSwing()
                this.item.invokeEvent("Swing")
            })
            this.connectionAttribute = physicalItem.GetAttributeChangedSignal("SwingDelay").Connect(() => {
                if(instance.GetAttribute("IsAiming")) return
                if(this.canSwing()) {
                    this.localSwing()
                    this.item.invokeEvent("Swing")
                } else {
                    if(!this.item.item.GetAttribute("SwingDelay")) {
                        this.onNoLongerSwinging()
                    }
                }
            })
        })
    }
}