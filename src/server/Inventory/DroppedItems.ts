import { ProximityPromptService } from "@rbxts/services"
import { Item } from "shared/Item"
import { ServerItem } from "server/Item/ServerItem"

type ItemCallback = () => ServerItem
const map = new Map<Instance, ItemCallback>

export function registerCollectableItem(item: Instance, callback: ItemCallback, destroyHost = true) {
    map.set(item, callback)
}

ProximityPromptService.PromptTriggered.Connect(async (prompt, player) => {
    const { Inventory } = await import("./Inventory")
    if(prompt.Name !== "PickUp") return
    const host = prompt.Parent!.Parent as Instance
    const ItemCallback = map.get(host)
    assert(ItemCallback)
    const inventory = Inventory.getInventory(player)
    const item = ItemCallback()
    if(inventory?.giveItem(item)) {
        map.delete(host)
        host.Destroy()
    }
})