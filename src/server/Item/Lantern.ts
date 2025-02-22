import { ProximityPromptService, ReplicatedStorage, RunService } from "@rbxts/services";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";
import { ServerItem } from "./ServerItem";
import { Ability } from "shared/Ability";
import { Soul } from "server/Entities/Soul";

export class LanternAbility extends Ability<LanternItem> {
    connection: RBXScriptConnection | undefined;


    addTarget(soul: Soul) {
        soul.targetTo = this.item
        soul.setState("targetState")
    }

    onTick() {
        const pivot = this.item.getPosition()
        for(const soul of Soul.registry) {
            if(soul.targetTo !== undefined) continue;
            const distance = soul.distanceTo(pivot)
            if(distance <= 20) {
                this.addTarget(soul)
            }
        }
    }

    onEquip() {
        this.connection = RunService.Heartbeat.Connect(() => {
            this.onTick()
        })
    }

    onUnequip() {
        for(const soul of Soul.registry) {
            if(soul.targetTo !== this.item) continue;
            soul.targetTo = undefined
            soul.setState("defaultTick")
        }

        this.connection?.Disconnect();
    }
}

type Constraint = ReplicatedStorage["Tools"]["Lantern"]
export class LanternItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Lantern.Clone())
        this.abilityManager.add(new LanternAbility(this))
    }
}