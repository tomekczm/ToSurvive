import { ClientItem } from "client/Item/ClientItem";
import { BuildAbility } from "./BuildAbility";
import { UserInputService } from "@rbxts/services";

export class SelfBuildAbility extends BuildAbility {
    prefab: Model;
    placeConnection: RBXScriptConnection | undefined;

    constructor(instance: ClientItem, prefab: Model) {
        super(instance);
        this.prefab = prefab
    }

    onStart(): void {
        this.item.equipEvent.Connect(() => {
            this.startBuilding(this.prefab)
            this.placeConnection = UserInputService.InputBegan.Connect((input) => {
                if(input.UserInputType !== Enum.UserInputType.MouseButton1) return
                this.buildEvent.FireServer(this.position)
            })
        })

        this.item.unequipEvent.Connect(() => {
            this.placeConnection?.Disconnect()
        })
    }
}