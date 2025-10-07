import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox";
import { Players, UserInputService } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";
import { InputBeganEvent } from "./EventInterfaces";

export class SwingAbility extends Ability<ClientItem<Model>> implements InputBeganEvent {
    connectionAttribute: RBXScriptConnection | undefined
    raycastHitbox!: HitboxObject;


    canSwing() {

        const isAiming = this.item.item.GetAttribute("IsAiming") === true
        const m1Pressed = UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)
        const isOnDelay = this.item.item.GetAttribute("SwingDelay");

        return (
            !isOnDelay && 
            m1Pressed &&
            !isAiming
        )
    }

    localSwing() {}

    onNoLongerSwinging() {}

    inputBegan(input: InputObject, processed: boolean): void {
        if(input.UserInputType !== Enum.UserInputType.MouseButton1)
            return
        

        print()
        if(this.canSwing()) {
            this.localSwing()
            this.item.invokeEvent("Swing")

            this.connectionAttribute = this.item.item.GetAttributeChangedSignal("SwingDelay").Connect(() => {
                if(this.canSwing()) {
                    this.localSwing()
                    this.item.invokeEvent("Swing")
                } else {
                    if(!this.item.item.GetAttribute("SwingDelay")) {
                        this.onNoLongerSwinging()
                    }
                }
            })
        }
    }

    onEquip() {}

    onUnequip() {
        this.connectionAttribute?.Disconnect()
    }

    onStart(): void {
        super.onStart()
    }
}