import { Players, ReplicatedStorage, RunService, UserInputService, Workspace } from "@rbxts/services"
import { ClientItem } from "client/Item/ClientItem"
import { getItemFromInstance } from "client/Item/ItemRegistrar";
import { Item } from "shared/Item";

const guiLookup = new Map<number, ViewportFrame>();
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
const backgroundHotbar = playerGui
                            .WaitForChild("Inventory")
                            .WaitForChild("Background")
                            .WaitForChild("InventoryBackground")
                            .WaitForChild("Frame")

const hoverGui = playerGui
                        .WaitForChild("Hover")
                        .WaitForChild("background") as GuiLabel
const hoverDescription = hoverGui.WaitForChild("Description") as TextBox
const hoverTitle = hoverGui.WaitForChild("Title") as TextBox


const MAX_SLOTS = Workspace.GetAttribute("MAX_SLOTS") as number
const HOTBAR_SLOTS = Workspace.GetAttribute("HOTBAR_SLOTS") as number

const packets = ReplicatedStorage.Events.Inventory
const equipPacket = packets.EquipSlot
const SetSlot = packets.WaitForChild("SetSlot") as RemoteEvent

const inventory = new Map<number, ClientItem>()

UserInputService.InputChanged.Connect((input) => {
    if(input.UserInputType !== Enum.UserInputType.MouseMovement)
        return

    const { X, Y } = input.Position;
    const elements = playerGui.GetGuiObjectsAtPosition(X, Y)
    

    for (const i of elements) {
        const slotID = i.GetAttribute("SlotID") as number | undefined
        if(slotID !== undefined) {
            const item = inventory.get(slotID)
            itemHover(item)
            return
        } else {
            itemHover(undefined)
        }
    }
})

function itemHover(item: ClientItem | undefined) {
    if(!item) {
        hoverGui.Visible = false
        return
    }
    hoverGui.Visible = true
    hoverDescription.Text = item.getName()
    hoverDescription.Text = item.getDescription()
    const { X, Y } = UserInputService.GetMouseLocation()
    hoverGui.Position = UDim2.fromOffset(X, Y) 
}

SetSlot.OnClientEvent.Connect((slot, item) => {
    const clientItem = getItemFromInstance(item)
    assert(clientItem, `Client item not found wth!!! ${(item as Instance).GetFullName()}`)
    inventory.set(slot, clientItem)
})

for(const i of $range(1, MAX_SLOTS)) {
    const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ViewportFrame;
    clone.Parent = backgroundHotbar;
    clone.LayoutOrder = i;
    clone.Name = tostring(i);
    
    guiLookup.set(i, clone)
    clone.SetAttribute("SlotID", i);
}