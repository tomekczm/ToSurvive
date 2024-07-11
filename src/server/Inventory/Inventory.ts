import { Players, ReplicatedStorage } from "@rbxts/services";
import { HammerItem } from "server/Item/Hammer";
import { ServerItem } from "server/Item/ServerItem";
import { SwordItem } from "server/Item/Sword";
import { Recipe } from "shared/HammerRecipes";
import { Item } from "shared/Item";

const packets = ReplicatedStorage.Events.Inventory
const equipPacket = packets.EquipSlot
const SetSlot = packets.WaitForChild("SetSlot") as RemoteEvent
const SwapSlot = packets.SwapSlots

const map = new Map<Player, Inventory>()

export class Inventory {
    private itemMap = new Map<number, ServerItem>()
    player: Player;
    stoarge: Folder;

    equippedSlot: number | undefined
    
    static getInventory(player: Player) {
        return map.get(player);
    }

    constructor(player: Player) {
        this.player = player;
        const stoarge = new Instance("Folder")
        stoarge.Name = "Stoarge"
        stoarge.Parent = this.player
        this.stoarge = stoarge;
    }

    getSlot(slot: number) {
        return this.itemMap.get(slot);
    }

    setSlot(slot: number, item: ServerItem | undefined) {
        if(item) {
            item.item.Parent = this.stoarge
            item.setOwnership(
                this
            )
            this.itemMap.set(slot, item);
            SetSlot.FireClient(this.player,slot, item.item)
        } else {
            SetSlot.FireClient(this.player, slot)
            this.itemMap.delete(slot);
        }
    }

    equipSlot(index: number) {
        if(this.equippedSlot !== undefined) {
            const prevItem = this.getSlot(this.equippedSlot)
            if(prevItem) {
                prevItem.unequip()

                const isSameSlot = this.equippedSlot === index 
                this.equippedSlot = undefined
                if(isSameSlot) return undefined
            }
        }

        this.equippedSlot = index

        const item = this.getSlot(index)
        if(!item) return
        item.equip()
        return item
    }

    getQuantityByName(name: string) {
        let quantity = 0
        for (const [key, value] of this.itemMap) {
            if(value && value.getName() === name) quantity += value.getQuantity()
        }
        return quantity
    }

    private consumeItem(name: string, quantity: number = 1) {
        let quantityConsumed = 0;
        for (const [key, value] of this.itemMap) {
            if(value.getName() !== name) continue;
            const quantityLeft = quantity - quantityConsumed;
            if(quantityLeft === 0) return
            const itemQuantity = value.getQuantity()
            const toConsume = math.min(quantityLeft, itemQuantity)
            value.setQuantity(itemQuantity - toConsume)
        }
    }

    useRecipe(recipe: Recipe<Item, unknown>): boolean {
        const requirements = recipe.requirements
        for (const requirement of requirements) {
            const name = requirement.item.getName()
            const isEnough = this.getQuantityByName(name) >= requirement.quantity;
            if(!isEnough) return false;
        }

        for (const requirement of requirements) {
            const name = requirement.item.getName()
            this.consumeItem(name, requirement.quantity)
        }
        return true
    }
}

equipPacket.OnServerInvoke = ((player, slot) => {
    const inventory = Inventory.getInventory(player);
    assert(typeOf(slot) === "number" && inventory)
    return inventory.equipSlot(slot as number)?.item
})

SwapSlot.OnServerEvent.Connect((player, index1, index2) => {
    const inventory = Inventory.getInventory(player);
    assert(typeOf(index1) === "number" && typeOf(index2) === "number" && inventory)
    const slot1 = inventory.getSlot(index1 as number)
    const slot2 = inventory.getSlot(index2 as number)
    inventory.setSlot(index1 as number, slot2);
    inventory.setSlot(index2 as number, slot1)
})

Players.PlayerAdded.Connect((player) => {
    const inventory = new Inventory(player)
    map.set(
        player,
        inventory
    )
    inventory.setSlot(1, new HammerItem())
    inventory.setSlot(2, new SwordItem())
})