import React, { StrictMode, useCallback, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { UserInputService, Workspace } from "@rbxts/services";
import * as LegacyUI from "./LegacyUI";
import * as UI from "./UI";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { equipPacket, forceUnequipPacket, ItemUI, QuantityChanged, SetSlot } from "./IntentoryController";
import { getItemFromInstance } from "client/Item/ItemRegistrar";
import { ClientItem } from "client/Item/ClientItem";


const isLegacy = false;

const MAX_SLOTS = Workspace.GetAttribute("MAX_SLOTS") as number
const HOTBAR_SLOTS = Workspace.GetAttribute("HOTBAR_SLOTS") as number

const numberMap = new Map<Enum.KeyCode, number>([
    [Enum.KeyCode.One, 1],
    [Enum.KeyCode.Two, 2],
    [Enum.KeyCode.Three, 3],
    [Enum.KeyCode.Four, 4],
    [Enum.KeyCode.Five, 5]
])

let equippedItem: ClientItem | undefined
let delay = false;

export function unequipCurrentItem() {
    equipPacket.FireServer(undefined)
    equippedItem?.unequip()
    equippedItem = undefined
}

forceUnequipPacket.OnClientEvent.Connect(() => {
    unequipCurrentItem()
})

function equipSlot(item: ClientItem | undefined) {
    //it just breaks if u spam buttons w/o any delay
    if(delay) return
    delay = true
    task.delay(0.1, () => { delay = false })
    equippedItem?.unequip()
    if(item === undefined || item === equippedItem) {
        equipPacket.FireServer(undefined)
        equippedItem = undefined
        return
    }
    equipPacket.FireServer(item.item)
    item?.equip()
    equippedItem = item
    
}

const defaultUdim = new UDim2(0, 100, 0, 100)
const inventory = new Map<number, ClientItem | undefined>()
SetSlot.OnClientEvent.Connect((slot, item) => {
    const asInstance = getItemFromInstance(item);
    inventory.set(slot, asInstance)
})


function Slot(props: { index: number, hotbar: boolean }) {

    let item: ClientItem | undefined = undefined

    const EMPTY_STATE = {
        slotId: props.index,
        isHotbar: props.hotbar,
    }

    let [state, setState] = useState<ItemUI>({
        ...EMPTY_STATE,
        item: inventory.get(props.index)
    })

    function updateSelf() {
        if(!item) {
            setState(EMPTY_STATE);
            return;
        }
        setState({
            item: item,
            ...EMPTY_STATE
        })
    }

    useEventListener(SetSlot.OnClientEvent, (slot: unknown, newItem) => {
        const asInstance = getItemFromInstance(newItem);
        if(slot === props.index) {
            item = asInstance
            updateSelf()
        }
    })

    useEventListener(UserInputService.InputEnded, (input, processed) => {
        if(processed || !props.hotbar) return;
        if(numberMap.get(input.KeyCode) !== props.index) return;
        equipSlot(state.item)
    })

    useEventListener(QuantityChanged.OnClientEvent, (eventItem, quantity) => {
        if(item !== getItemFromInstance(eventItem)) return;
        updateSelf();
    })

    if(isLegacy) {
        return <LegacyUI.Slot {...state}/>;
    } else {
        return <UI.Slot {...state}/>;
    }
}

function Hotbar() {
    const slots: JSX.Element[] = []
    for(const i of $range(1, HOTBAR_SLOTS)) {
        slots.push(
            <Slot index={i} hotbar={true}/>
        )
    }

    useEventListener()

    return <frame
        Size={defaultUdim}
        Position={new UDim2(0.5, 0,1, -10)}
        AnchorPoint={new Vector2(0.5, 1)}
        BackgroundTransparency={1}
    >
        <uilistlayout
            Padding={new UDim(0, 5)}
            FillDirection={Enum.FillDirection.Horizontal}
            VerticalAlignment={Enum.VerticalAlignment.Center}
            HorizontalAlignment={Enum.HorizontalAlignment.Center}
        />
        { slots }
    </frame>
}

function Inventory() {
    const slots: JSX.Element[] = []
    for(const i of $range(1, MAX_SLOTS)) {
        slots.push(
            <Slot index={i} hotbar={false}/>
        )
    }

    return <UI.Inventory slots={slots}/>
}

function Layout() {
    return <>
        <screengui>
            <Hotbar/>
        </screengui>

        <Inventory/>
    </>
}

const playerGui = game.GetService("Players").LocalPlayer!.FindFirstChild("PlayerGui") as PlayerGui;
const root = createRoot(new Instance("Folder"));

root.render(
    <StrictMode>
        {playerGui && createPortal(<Layout />, playerGui)}
    </StrictMode>
);