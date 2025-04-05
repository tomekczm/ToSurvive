import { sample } from "shared/Array";
import { BiomeProp } from "./BiomeProp";
import { ServerStorage } from "@rbxts/services";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { RockItem } from "server/Item/Rock";

const rocks = ServerStorage.Models.SmallRocks.GetChildren() as Model[]
export class StoneProp extends BiomeProp {

    constructor(chance: number) {
        super(chance, undefined as unknown as Model)
    }

    getClone(random: Random) {
        const rock = random.Sample(rocks).Clone()
        registerCollectableItem(
            rock,
            () => new RockItem()
        )
        return rock        
    }
}