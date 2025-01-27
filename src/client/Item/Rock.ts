import { CollectionService, Players, ProximityPromptService, ServerStorage, Workspace } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { SwingAbility } from "client/ItemAbility/SwingAbility";
import { Ability } from "shared/Ability";
import { SetPrompts, SetProximity } from "client/ProximityPrompts";


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


class FirecampFuel extends Ability<RockItem> {

    setPrompts(mode: boolean) {
        SetPrompts("AddFuel", mode)
    }

    onEquip() {
        this.setPrompts(true)
    }

    onUnequip() {
        this.setPrompts(false)
    }
}

class WashRockAbility extends Ability<RockItem> {
    rotateAbility: PointAtAbility;

    constructor(item: RockItem, rotateAbility: PointAtAbility) {
        super(item)
        this.rotateAbility = rotateAbility
    }

    onStart(): void {
        this.item.equipEvent.Connect(() => {
            SetPrompts("WashPrompt", true)
        })

        this.item.unequipEvent.Connect(() => {
            SetPrompts("WashPrompt", false)
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
        this.abilityManager.add(new FirecampFuel(this))
    }

    getDescription(): string {
        return `I once had a rock i named him John.`
    }

    getExtendedDescription(): string {
        return `${this.getDescription()}\n\n` +
            `${this.createHintText("Tip: Rip John 2017-2024")}\n` +
            `${this.createHintText("Tip 2: Wash the rock in water")}`
    }
}