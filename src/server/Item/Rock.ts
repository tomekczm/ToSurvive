import { CollectionService, ProximityPromptService, ReplicatedStorage, TweenService } from "@rbxts/services";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";
import { ServerItem } from "./ServerItem";
import { FlintItem } from "./Flint";

const rng = new Random()

type Bucket = ReplicatedStorage["Builds"]["Wooden Water Bucket"]
type Campfire = ReplicatedStorage["Builds"]["Campfire"]


const VFXTweenData = new TweenInfo(10)

CollectionService.GetInstanceAddedSignal("DestroyCampfireVFX").Connect((instance) => {
    const descendants = instance.GetDescendants()
    for(const descendant of descendants) {
        if(descendant.IsA("Fire") || descendant.IsA("ParticleEmitter")) {
            descendant.Enabled = false
        }
        if(descendant.IsA("Sound")) {
            descendant.Stop()
        }
        if(descendant.IsA("PointLight")) {
            TweenService.Create(
                descendant, VFXTweenData, 
                { Brightness: 0, Range: 0 }
            ).Play()
        }
        if(descendant.IsA("Sound")) {
            TweenService.Create(
                descendant, VFXTweenData, 
                { Volume: 0 }
            ).Play()
        }
    }
})

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

ProximityPromptService.PromptTriggered.Connect(async (prompt, player) => {
    if(prompt.Name !== "AddFuel") return;
    const { Inventory } = await import("server/Inventory/Inventory")
    const inventory = Inventory.getInventory(player)
    assert(inventory)

    const equippedItem = inventory.getEquippedItem()
    const isAFuel = equippedItem?.getAttribute("IsAFuel", false)

    if(!equippedItem || !isAFuel) return;

    const fuelValue = equippedItem.getAttribute("FuelValue", 5)

    const campfire = prompt.Parent!.Parent as Campfire
    const MaxFuel = campfire.GetAttribute("MaxFuel") as number ?? 100
    const CurrentFuel = campfire.GetAttribute("Fuel") as number ?? 0;

    const newFuel = CurrentFuel + fuelValue
    if(newFuel >= MaxFuel) return

    campfire.SetAttribute(
        "Fuel",
        math.min(MaxFuel, newFuel)
    )

    equippedItem?.consumeItem()
})

type Constraint = ReplicatedStorage["Tools"]["Rock"]
export class RockItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Rock.Clone())
        this.abilityManager.add(new CollectAbility(this));
    }
}