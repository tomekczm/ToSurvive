import { ReplicatedStorage } from "@rbxts/services"
import { ClientItem } from "client/Item/ClientItem"

const packets = ReplicatedStorage.Events.Inventory
export const equipPacket = packets.EquipSlot
export const swapSlot = packets.SwapSlots
export const SetSlot = packets.WaitForChild("SetSlot") as RemoteEvent
export const QuantityChanged = packets.QuantityChanged
export const forceUnequipPacket = packets.ForceUnequipMainSlot

export interface ItemUI {
    item?: ClientItem,
    isHotbar: boolean
    slotId: number,
}