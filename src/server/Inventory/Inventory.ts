import { CollectionService, Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { AxeItem } from "server/Item/Axe";
import { HammerItem } from "server/Item/Hammer";
import { LanternItem } from "server/Item/Lantern";
import { RockItem } from "server/Item/Rock";
import { ServerItem } from "server/Item/ServerItem";
import { ShovelItem } from "server/Item/Shovel";
import { SpearItem } from "server/Item/Spear";
import { SwordItem } from "server/Item/Sword";
import { WoodenWaterBucket } from "server/Item/WoodenWaterBucket";
import { Item } from "shared/Item";
import { Recipe } from "shared/Recipes/Recipe";
import { TwoWayMap } from "shared/TwoWayMap";
import { registerCollectableItem } from "server/Inventory/DroppedItems"

const packets = ReplicatedStorage.Events.Inventory
const equipPacket = packets.EquipSlot
const SetSlot = packets.WaitForChild("SetSlot") as RemoteEvent
const SwapSlot = packets.SwapSlots
const forceUnequipPacket = packets.ForceUnequipMainSlot

const map = new Map<Player, Inventory>()

const MAX_SLOTS = Workspace.GetAttribute("MAX_SLOTS") as number

const rng = new Random()

export class Inventory {
    itemMap = new Map<number, ServerItem>()
    player: Player;
    stoarge: Folder;

    equippedSlot: number | undefined
    
    private onCharacter(character: Model) {
        task.spawn(() => {
            const humanoid = character.WaitForChild("Humanoid") as Humanoid
            humanoid.Died.Once(() => {
                if(!this.equippedSlot) return
                const item = this.getSlot(this.equippedSlot) 
                item?.unequip()
                forceUnequipPacket.FireClient(this.player)
            })
        })
    }

    static getInventory(player: Player) {
        return map.get(player);
    }

    constructor(player: Player) {
        this.player = player;
        const stoarge = new Instance("Folder")
        stoarge.Name = "Stoarge"
        stoarge.Parent = this.player
        this.stoarge = stoarge;

        const character = this.player.Character
        if(character) {
            this.onCharacter(character)
        }
        this.player.CharacterAdded.Connect((model) => this.onCharacter(model))
    }

    getEquippedItem() {
        if(this.equippedSlot) return this.getSlot(this.equippedSlot)
        return
    }

    getSlot(slot: number) {
        return this.itemMap.get(slot);
    }

    setSlot(slot: number, item: ServerItem | undefined) {
        let prevItem
        if(this.equippedSlot && slot === this.equippedSlot)
            prevItem = this.getSlot(this.equippedSlot) 

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
        if(prevItem) {
            prevItem.unequip()
            forceUnequipPacket.FireClient(this.player)
        }
    }

    giveItem(item: ServerItem): boolean {
        let emptySlot: number | undefined = undefined
        for(const i of $range(1, MAX_SLOTS)) {
            const slot = this.getSlot(i)
            if(!slot && !emptySlot) {
                emptySlot = i
                if(!item.isStackable()) break
            }

            if(slot) {
                if(slot.getName() === item.getName() && item.isStackable()) {
                    slot.setQuantity(slot.getQuantity() + item.getQuantity())
                    return true
                }
            }
        }
        if(emptySlot !==  undefined) {
            this.setSlot(emptySlot, item)
            return true
        }
        return false
    }


    unequip() {
        if(this.equippedSlot !== undefined) {
            const prevItem = this.getSlot(this.equippedSlot)
            if(prevItem) {
                prevItem.unequip()

                this.equippedSlot = undefined
            }
        }
    }

    equipSlot(index: number) {
        this.unequip()
        const isSameSlot = this.equippedSlot === index 
        if(isSameSlot) return undefined

        this.equippedSlot = index

        const item = this.getSlot(index)
        if(!item) return
        item.equip()
        return item
    }

    getQuantityByName(name: string) {
        let quantity = 0
        for (const [_, value] of this.itemMap) {
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
            quantityConsumed += toConsume
            value.setQuantity(itemQuantity - toConsume)
            if(value.getQuantity() === 0) {
                value.item.Destroy()
                this.setSlot(key, undefined)
            }
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

    static dropItem(at: Vector3, item: Model) {
        const position = new Vector3(
            rng.NextNumber(-5, 5),
            rng.NextNumber(10, 15), // 10
            rng.NextNumber(-5, 5)
        ).add(at)
    
        const ray = Workspace.Raycast(
            position,
            new Vector3(0, -100, 0),
        )
    
        const params = new RaycastParams()
        params.AddToFilter(CollectionService.GetTagged("Tree"))
        params.AddToFilter(CollectionService.GetTagged("DroppedItem"))
        const players = Players.GetPlayers()
    
        for (const player of players) {
            if (player.Character) params.AddToFilter(player!.Character)
        }
    
    
        if (ray) {
            const woodenLog = item.Clone()
            woodenLog.Parent = Workspace
            woodenLog.SetAttribute("StartPos", at)
            woodenLog.PivotTo(new CFrame(ray.Position))
            registerCollectableItem(
                woodenLog,
                () => { return new SwordItem() }
            )
        }
    }
}

equipPacket.OnServerEvent.Connect((player, item) => {
    
    const inventory = Inventory.getInventory(player);

    assert(inventory)
    let slot: number | undefined
    for (const [key, value] of inventory.itemMap) {
        if(value.item === item) {
            slot = key
        }
    }
    
    if(slot) 
        inventory.equipSlot(slot as number)
    else
        inventory.unequip()
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
    inventory.setSlot(3, new AxeItem())
    inventory.setSlot(4, new RockItem().setQuantity(10))
    inventory.setSlot(5, new WoodenWaterBucket().setCapacity(5))
    inventory.setSlot(6, new SpearItem())
    inventory.setSlot(7, new ShovelItem())
    inventory.setSlot(8, new LanternItem())
})