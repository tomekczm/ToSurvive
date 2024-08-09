import { CollectionService, Players, ProximityPromptService, ServerStorage, Workspace } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { SwingAbility } from "client/ItemAbility/SwingAbility";
import { Ability } from "shared/Ability";


type Bucket = ReplicatedStorage["Builds"]["Wooden Water Bucket"]

ProximityPromptService.PromptButtonHoldBegan.Connect((prompt) => {
    if(prompt.Name !== "WashRock") return
    const bucket = prompt.Parent!.Parent as Bucket
    const capacity = bucket.GetAttribute("Capacity") as number ?? 0
    if(capacity < 0.5) { 
        prompt.Enabled = false
        task.spawn(() => { task.wait(1); prompt.Enabled = true })
        return;
    }
})

class WashRockAbility extends Ability<RockItem> {
    rotateAbility: PointAtAbility;

    constructor(item: RockItem, rotateAbility: PointAtAbility) {
        super(item)
        this.rotateAbility = rotateAbility
    }

    onStart(): void {
        this.item.equipEvent.Connect(() => {
            const tagged = CollectionService.GetTagged("Bucket") as Bucket[]
            for(const bucket of tagged) {
                if(bucket.IsDescendantOf(Workspace)) bucket.RootPart.WashRock.Enabled = true
            }
        })

        this.item.unequipEvent.Connect(() => {
            const tagged = CollectionService.GetTagged("Bucket") as Bucket[]
            for(const bucket of tagged) {
                bucket.RootPart.WashRock.Enabled = false
            }
        })
    }
}

type Constraint = ReplicatedStorage["Tools"]["Rock"]
export class RockItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)

        const pointAtAbility = new PointAtAbility(this, "TorsoAttach")

        this.abilityManager.add(new SwingAbility(this))
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(pointAtAbility)
        this.abilityManager.add(new WashRockAbility(this, pointAtAbility))
    }
}