import { ProximityPromptService, ReplicatedStorage } from "@rbxts/services";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";
import { ServerItem } from "./ServerItem";
import { FlintItem } from "./Flint";

const rng = new Random()

type Bucket = ReplicatedStorage["Builds"]["Wooden Water Bucket"]

ProximityPromptService.PromptTriggered.Connect(async (prompt, player) => {
    const { Inventory } = await import("server/Inventory/Inventory")
    if(prompt.Name !== "WashRock") return
    const bucket = prompt.Parent!.Parent as Bucket
    const capacity = bucket.GetAttribute("Capacity") as number ?? 0
    if(capacity < 0.5) { 
        return
    }

    bucket.SetAttribute(
        "Capacity",
        capacity - 0.5
    )

    const inventory = Inventory.getInventory(player)
    assert(inventory)
    const equippedItem = inventory.getEquippedItem()
    equippedItem?.consumeItem()
    if(rng.NextInteger(1, 2) === 1) {
        inventory.giveItem(new FlintItem())
    }
})

type Constraint = ReplicatedStorage["Tools"]["Rock"]
export class RockItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Rock.Clone())
        this.abilityManager.add(new CollectAbility(this));
    }
}