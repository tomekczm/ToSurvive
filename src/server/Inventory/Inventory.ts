import { Players, ReplicatedStorage } from "@rbxts/services";
import { ServerItem } from "server/Item/ServerItem";
import { SwordItem } from "server/Item/Sword";
import { Item } from "shared/Item";

const packets = ReplicatedStorage.Events.Inventory
const equipPacket = packets.EquipSlot
const SetSlot = packets.WaitForChild("SetSlot") as RemoteEvent

const map = new Map<Player, Inventory>()

class Inventory {
    private itemMap = new Map<number, ServerItem>()
    player: Player;
    stoarge: Folder;
    
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

    setSlot(slot: number, item: ServerItem) {
        item.item.Parent = this.stoarge
        item.setOwnership(
            this.player
        )
        this.itemMap.set(slot, item);
        print(item.item.GetFullName())
        SetSlot.FireClient(this.player,slot, item.item)
    }

    equipSlot(index: number) {}
}

equipPacket.OnServerEvent.Connect((player, index) => {
    Inventory.getInventory(player)?.equipSlot(index as number)
})

Players.PlayerAdded.Connect((player) => {
    const inventory = new Inventory(player)
    map.set(
        player,
        inventory
    )
    inventory.setSlot(1, new SwordItem())
})