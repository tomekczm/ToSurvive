import { ClientItem } from "client/Item/ClientItem";
import { BuildAbility } from "./BuildAbility";
import { UserInputService } from "@rbxts/services";
import { InputBeganEvent } from "./EventInterfaces";

export class SelfBuildAbility extends BuildAbility implements InputBeganEvent {
    prefab: Model;
    placeConnection: RBXScriptConnection | undefined;

    constructor(instance: ClientItem, prefab: Model) {
        super(instance);
        this.prefab = prefab
    }
    
    inputBegan(input: InputObject): void {
        if(input.UserInputType !== Enum.UserInputType.MouseButton1) return
        this.buildEvent.FireServer(this.position)
    }

    onEquip() {
        this.startBuilding(this.prefab)
    }
}