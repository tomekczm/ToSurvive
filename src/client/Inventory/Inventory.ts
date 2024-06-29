import { Players, ReplicatedStorage, RunService, UserInputService, Workspace } from "@rbxts/services"
import { ClientItem } from "client/Item/ClientItem"
import { getItemFromInstance } from "client/Item/ItemRegistrar";
import { Item } from "shared/Item";

const guiLookup = new Map<number, ImageLabel>();
const hotbarGuiLookup = new Map<number, ImageLabel>();
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

const inventoryGui = playerGui
                        .WaitForChild("Inventory")

const inventoryBackground = inventoryGui
                        .WaitForChild("Background") as Frame                 

const backgroundHotbar = inventoryBackground
                            .WaitForChild("InventoryBackground")
                            .WaitForChild("Frame")

const hotbarGui = inventoryGui.WaitForChild("Hotbar")

const hoverGui = playerGui
                        .WaitForChild("Hover")
                        .WaitForChild("background") as GuiLabel

const draggingGui = playerGui
                        .WaitForChild("DraggingGui")
                        .WaitForChild("ImageLabel") as ImageLabel

const hoverDescription = hoverGui.WaitForChild("Description") as TextBox
const hoverTitle = hoverGui.WaitForChild("Title") as TextBox


const MAX_SLOTS = Workspace.GetAttribute("MAX_SLOTS") as number
const HOTBAR_SLOTS = Workspace.GetAttribute("HOTBAR_SLOTS") as number

const packets = ReplicatedStorage.Events.Inventory
const equipPacket = packets.EquipSlot
const swapSlot = packets.SwapSlots
const SetSlot = packets.WaitForChild("SetSlot") as RemoteEvent

let equippedItem: ClientItem | undefined

const inventory = new Map<number, ClientItem>()
let draggingSlot: number | undefined

function equipSlot(number: number) {
    equippedItem?.unequip()
    const item = equipPacket.InvokeServer(number) as Model | undefined
    print(item)
    if(item === undefined) return
    const itemClass = getItemFromInstance(item)
    itemClass?.equip()
    equippedItem = itemClass
}

function getSlotUnderMouse(input: InputObject) {
    const { X, Y } = input.Position;
    const elements = playerGui.GetGuiObjectsAtPosition(X, Y)
    

    for (const i of elements) {
        const slotID = i.GetAttribute("SlotID") as number | undefined
        if(slotID !== undefined) {
            return slotID
        }
    }
    return undefined
}

UserInputService.InputChanged.Connect((input) => {
    if(input.UserInputType !== Enum.UserInputType.MouseMovement)
        return

    if(draggingSlot) {
        const { X, Y } = UserInputService.GetMouseLocation()
        draggingGui.Position = UDim2.fromOffset(X, Y) 
    }

    const slotID = getSlotUnderMouse(input)
    if(slotID) {
        const item = inventory.get(slotID)
        itemHover(item)
        return
    } else {
        itemHover(undefined)
    }
})


UserInputService.InputBegan.Connect((input) => {
    if(input.KeyCode !== Enum.KeyCode.E) return
    inventoryBackground.Visible = !inventoryBackground.Visible
})

const numberMap = new Map<Enum.KeyCode, number>([
    [Enum.KeyCode.One, 1],
    [Enum.KeyCode.Two, 2],
    [Enum.KeyCode.Three, 3],
    [Enum.KeyCode.Four, 4]
])

UserInputService.InputBegan.Connect((input) => {
    const number = numberMap.get(input.KeyCode)
    if(number === undefined) return
    equipSlot(number)
})

// Dragging begin
UserInputService.InputBegan.Connect((input) => {
    if(input.UserInputType !== Enum.UserInputType.MouseButton1)
        return

    const slotID = getSlotUnderMouse(input)
    if(slotID) {
        const item = inventory.get(slotID)
        if(!item) return
        draggingGui.Image = item.getThumbnail();
        draggingGui.Visible = true;
        const { X, Y } = UserInputService.GetMouseLocation()
        draggingGui.Position = UDim2.fromOffset(X, Y) 
        draggingSlot = slotID;
    }
})

// Dragging end
UserInputService.InputEnded.Connect((input) => {
    if(input.UserInputType !== Enum.UserInputType.MouseButton1)
        return

    const slotID = getSlotUnderMouse(input)

    if(slotID !== undefined && draggingSlot !== undefined && slotID !== draggingSlot) {
        swapSlot.FireServer(slotID, draggingSlot)
    }

    if(typeOf(slotID) === "number" && slotID === draggingSlot) {
        equipSlot(slotID as number)
    }

    draggingSlot = undefined
    draggingGui.Visible = false;
})

function itemHover(item: ClientItem | undefined) {
    if(!item) {
        hoverGui.Visible = false
        return
    }
    hoverGui.Visible = true
    hoverTitle.Text = item.getName()
    hoverDescription.Text = item.getDescription()
    const { X, Y } = UserInputService.GetMouseLocation()
    hoverGui.Position = UDim2.fromOffset(X, Y) 
}

SetSlot.OnClientEvent.Connect((slot, item) => {
    if((item as unknown) !== undefined) {
        const clientItem = getItemFromInstance(item)
        assert(clientItem, `Client item not found wth!!! ${(item as Instance).GetFullName()}`)
        inventory.set(slot, clientItem)
        const gui = guiLookup.get(slot)
        if(gui) gui.Image = clientItem.getThumbnail()
        const hotbarGui = hotbarGuiLookup.get(slot)
        if(hotbarGui) hotbarGui.Image = clientItem.getThumbnail()
    } else {
        inventory.delete(slot)
        const gui = guiLookup.get(slot)
        if(gui) gui.Image = ""
        const hotbarGui = hotbarGuiLookup.get(slot)
        if(hotbarGui) hotbarGui.Image = ""
    }
})

for(const i of $range(1, MAX_SLOTS)) {
    const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ImageLabel;
    clone.Parent = backgroundHotbar;
    clone.LayoutOrder = i;
    clone.Name = tostring(i);
    
    guiLookup.set(i, clone)
    clone.SetAttribute("SlotID", i);
}

for(const i of $range(1, HOTBAR_SLOTS)) {
    const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ImageLabel;
    clone.Parent = hotbarGui;
    hotbarGuiLookup.set(i, clone)
}