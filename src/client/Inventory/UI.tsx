import { atom } from "@rbxts/charm";
import { useMotion, useMountEffect, useMouse } from "@rbxts/pretty-react-hooks";
import React, { Element, useBinding, useEffect, useMemo, useRef, useState } from "@rbxts/react"
import { useAtom } from "@rbxts/react-charm";
import { createMotion, MotionGoal  } from "@rbxts/ripple";
import { RunService, UserInputService } from "@rbxts/services";
import { equipPacket, ItemUI, swapSlot } from "./IntentoryController";
import { ClientItem } from "client/Item/ClientItem";

interface Props {
    count: number
}

function CountUnderThree(props: Props) {
    return <frame
                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                BorderSizePixel={0}
                Position={new UDim2(0.682, 0, 0.682, 0)}
                Size={new UDim2(0, 27, 0, 27)}
            >
                <textlabel
                    BackgroundTransparency={1}
                    Font={Enum.Font.SourceSans}
                    Size={new UDim2(1, 0, 1, 0)}
                    Text={tostring(props.count)}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextSize={20}
                />
                <uicorner />
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(0, 0, 0)), new ColorSequenceKeypoint(1, Color3.fromRGB(0, 0, 0))])}
                    Rotation={90}
                    Transparency={new NumberSequence([new NumberSequenceKeypoint(0, 0.875, 0), new NumberSequenceKeypoint(1, 0.456, 0)])}
                />
            </frame>
}

function CountAboveThree(props: Props) {
    return <frame
	AutomaticSize={Enum.AutomaticSize.XY}
	BackgroundColor3={Color3.fromRGB(255, 255, 255)}
	BorderSizePixel={0}
	Position={new UDim2(0.47100000000000003, 0, 0.682, 0)}
	Size={new UDim2(0, 45, 0, 27)}
>
	<textlabel
		AnchorPoint={new Vector2(0.5,0.5)}
		AutomaticSize={Enum.AutomaticSize.XY}
		BackgroundTransparency={1}
		Font={Enum.Font.SourceSans}
		Position={new UDim2(0.5, 0, 0.5, 0)}
		Text={tostring(props.count)}
		TextColor3={Color3.fromRGB(255, 255, 255)}
		TextSize={20}
		TextXAlignment={Enum.TextXAlignment.Right}
		TextYAlignment={Enum.TextYAlignment.Bottom}
	/>
	<uigradient
		Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(0, 0, 0)), new ColorSequenceKeypoint(1, Color3.fromRGB(0, 0, 0))])}
		Rotation={90}
		Transparency={new NumberSequence([new NumberSequenceKeypoint(0, 0.875, 0), new NumberSequenceKeypoint(1, 0.456, 0)])}
	/>
	<uicorner />
</frame>
}

const dragged = atom<ItemUI | undefined>(undefined)
const hoveringSlot = atom<ClientItem | undefined>();

export function Dragging() {
    const mouse = useMouse()
    const draggedValue = useAtom(dragged);
    return <imagelabel
        Size={UDim2.fromOffset(100,100)}
        Position={mouse.map((p) => UDim2.fromOffset(p.X, p.Y))}
        Image={(draggedValue?.item) ? draggedValue.item.getThumbnail() : ""}
        BackgroundTransparency={1}
        AnchorPoint={new Vector2(0.5,0.5)}
    ></imagelabel>
}

export function Count(props: Props) {
    const countLength = tostring(props.count).size();
    return <>
        {
            (props.count === 1) ? <></> :
                (countLength < 3) ? <CountUnderThree count={props.count}/> : <CountAboveThree count={props.count}/> 
        }
    </>
}

const defaultUdim = new UDim2(0, 100, 0, 100)
export function Slot(props: ItemUI) {
    const [scaleBinding, setScaleGoal] = useMotion(1);
    const [hovering, setHovered] = useState(false);
    const reference = useRef<ImageButton>();

    const tweenOptions = {
        style: Enum.EasingStyle.Quad,
        direction: Enum.EasingDirection.Out,
        time: 0.125
    }

    

    useEffect(() => {
        if(hovering) {
            setScaleGoal.tween(1.1, tweenOptions)
        } else {
            setScaleGoal.tween(1, tweenOptions)
        }
    }, [hovering])

    function onHover() {
        const value = props?.item
        hoveringSlot(value)
        setHovered(true)
    }

    function onLeave() {        
        if(props.item === hoveringSlot()) {
            hoveringSlot(undefined)
        }
        setHovered(false)
    }


    return <imagebutton
        Size={defaultUdim}
        Image="rbxassetid://138521999253494"
        ResampleMode={Enum.ResamplerMode.Pixelated}
        BackgroundTransparency={1}
        ImageColor3={(props.isHotbar) ? Color3.fromRGB(89, 89, 89) : Color3.fromRGB(255,255,255)}
        Event={{
            MouseEnter: onHover,
            MouseLeave: onLeave,
            MouseButton1Down: () => {
                if(props.isHotbar) return
                dragged(props)
            },
            MouseButton1Up: () => {
                const draggedValue = dragged()
                if(draggedValue && draggedValue.slotId !== props.slotId) {
                    swapSlot.FireServer(draggedValue.slotId, props.slotId)
                }
                dragged(undefined);
            }
        }}
        ref={reference}
    >
        <UIBackdrop/>
        <imagelabel
            Size={UDim2.fromScale(0.85, 0.85)}
            AnchorPoint={new Vector2(0.5, 0.5)}
            Position={UDim2.fromScale(0.5,0.5)}
            Image={props.item?.getThumbnail()}
            BackgroundTransparency={1}
        >
                <uiscale Scale={scaleBinding}/>
                { (props.item?.getQuantity() !== undefined) && <Count count={props.item.getQuantity()}/> }
        </imagelabel>
    </imagebutton>
}
//        Size={new UDim2(0, 265, 0, 485)}
//        Position={new UDim2(0.313, 0, 0.499, 0)}

const BACKDROP_MULTIPLIER = UDim2.fromOffset(15,15);
const BACKDROP_SIZE = 0.2;

const shiftPressed = atom(false);

UserInputService.InputBegan.Connect((input, gp) => {          
    if(input.KeyCode === Enum.KeyCode.LeftShift) {
        shiftPressed(true)
    }
})

UserInputService.InputEnded.Connect((input, gp) => {          
    if(input.KeyCode === Enum.KeyCode.LeftShift) {
        shiftPressed(false)
    }
})

UserInputService.InputEnded.Connect((input, gp) => {          
    if(input.UserInputType === Enum.UserInputType.MouseButton1) {
        if(hoveringSlot())
            return
        dragged(undefined)
    }
})

function UIDrag() {
    const position = useMouse()
    const dragging = useAtom(hoveringSlot)
    const shiftIn = useAtom(shiftPressed)

    return <screengui
        ClipToDeviceSafeArea={false}
        ScreenInsets={Enum.ScreenInsets.None}
        DisplayOrder={10}
    >
        <frame
            AutomaticSize={Enum.AutomaticSize.XY}
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BorderSizePixel={0}
            Position={position.map((p) => UDim2.fromOffset(p.X, p.Y))}
            Visible={(dragging) ? true : false}
        >
            <uistroke />
            <uicorner />
            <textlabel
                AutomaticSize={Enum.AutomaticSize.XY}
                BackgroundTransparency={1}
                Font={Enum.Font.SourceSansBold}
                Text={dragging?.getName()}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                TextSize={30}
                TextWrapped={true}
            >
                <uigradient
                    Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(7, 222, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(85, 170, 255))])}
                />
            </textlabel>
            <textlabel
                AutomaticSize={Enum.AutomaticSize.XY}
                BackgroundTransparency={1}
                Font={Enum.Font.SourceSans}
                RichText={true}
                Text={(shiftIn) ? dragging?.getExtendedDescription() : dragging?.getDescription()}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                TextSize={20}
                TextWrapped={true}
                TextXAlignment={Enum.TextXAlignment.Left}
                TextYAlignment={Enum.TextYAlignment.Bottom}
            />
            <uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} />
            <uipadding
                PaddingBottom={new UDim(0, 5)}
                PaddingLeft={new UDim(0, 10)}
                PaddingRight={new UDim(0, 5)}
                PaddingTop={new UDim(0, 5)}
            />
            <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(181, 181, 181))])}
                Rotation={90}
            />
        </frame>
    </screengui>
}

function UIBackdrop() {
    return <imagelabel            
                BackgroundTransparency={1}
                Image="rbxassetid://135776919118274"
                AnchorPoint={new Vector2(0.5,0.5)}
                Position={UDim2.fromScale(0.5,0.5)}
                Size={UDim2.fromScale(1,1).add(BACKDROP_MULTIPLIER)}
                ScaleType={Enum.ScaleType.Slice}
                SliceCenter={new Rect(72, 72, 500, 500)}
                SliceScale={BACKDROP_SIZE}
                ZIndex={-2}
            />
}

function InventoryPanel(props: { Position: UDim2, Size: UDim2, AnchorPoint?: Vector2, children?: React.Element }) {
    return <>
        <imagebutton
            AnchorPoint={props.AnchorPoint ?? new Vector2(0.5, 0.5)}
            BackgroundTransparency={1}
            Image="rbxassetid://138521999253494"
            ScaleType={Enum.ScaleType.Slice}
            SliceCenter={new Rect(81, 84, 452, 450)}
            SliceScale={0.25}
            ResampleMode={Enum.ResamplerMode.Pixelated}
            Size={props.Size}
            Position={props.Position}
            
        >
            <textbutton
                Modal={true}
                Text={""}
            />
            <uigradient
                Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(135, 135, 135)), new ColorSequenceKeypoint(1, Color3.fromRGB(255, 255, 255))])}
                Rotation={-90}
            />

            <UIBackdrop/>
            
            { props.children }
        </imagebutton>
    </>
    return 
}

export function Inventory(props: { slots: ReturnType<typeof Slot>[] }) {
    const [visible, setVisible] = useState(false);
    const draggedValue = useAtom(dragged);
    useEffect(() => {
        const con = UserInputService.InputBegan.Connect((input, processed) => {
            if(processed) return
            if(input.KeyCode === Enum.KeyCode.E) {
                setVisible((prev) => !prev)
            }
        })

        return () => con.Disconnect()
    }, [])

    return <>
    <UIDrag/>
    <screengui
        IgnoreGuiInset={true}
        DisplayOrder={10}
    >
        {
                (draggedValue !== undefined) && <Dragging/>
        }
    </screengui>
    <screengui
        IgnoreGuiInset={true}
        ResetOnSpawn={false}
        SafeAreaCompatibility={Enum.SafeAreaCompatibility.None}
        ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
        ZIndexBehavior={Enum.ZIndexBehavior.Global}
    >
        <frame
            Visible={visible}
            BackgroundTransparency={1}
            Position={new UDim2(0, 0, 0, -20)}
            Size={new UDim2(1, 0, 1, 0)}
        >
            <InventoryPanel
                Size={new UDim2(0, 265, 0, 485)}
                Position={new UDim2(0.313, 0, 0.499, 0)}
            />

            <InventoryPanel
                AnchorPoint={new Vector2(0, 0.5)}
	            Size={new UDim2(0, 580, 0, 485)}
                Position={new UDim2(0.41300000000000003, 0, 0.5, 0)}
            >
                <frame
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    BackgroundTransparency={1}
                    Position={new UDim2(0.498, 0, 0.499, 0)}
                    Size={new UDim2(0.864, 0, 0.8210000000000001, 0)}
                >
                    <uigridlayout CellPadding={new UDim2(0, 0, 0, 0)} SortOrder={Enum.SortOrder.LayoutOrder} StartCorner={Enum.StartCorner.BottomLeft} />
                    {props.slots}
                </frame>
            </InventoryPanel>
        </frame>
    </screengui>
    </>
}