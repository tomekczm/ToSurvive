import React from "@rbxts/react";
import { ItemUI } from "./IntentoryController";
import { ClientItem } from "client/Item/ClientItem";

export function Slot(props: ItemUI) {
    return <imagelabel
        BackgroundColor3={Color3.fromRGB(255, 255, 255)}
        BorderSizePixel={0}
        Size={new UDim2(0, 100, 0, 100)}
    >
        <uicorner />
        <uigradient
            Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(159, 159, 159))])}
            Rotation={90}
        />
        <uistroke />
        <textlabel
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BorderSizePixel={0}
            Font={Enum.Font.SourceSans}
            FontFace={new Font(
                "rbxasset://fonts/families/SourceSansPro.json",
                Enum.FontWeight.Regular,
                Enum.FontStyle.Normal
            )}
            Position={new UDim2(0.9500000000000001, 0, 0.9500000000000001, 0)}
            Text={""}
            TextColor3={Color3.fromRGB(0, 0, 0)}
            TextSize={14}
            TextStrokeColor3={Color3.fromRGB(255, 255, 255)}
            TextStrokeTransparency={0}
            TextXAlignment={Enum.TextXAlignment.Right}
            TextYAlignment={Enum.TextYAlignment.Bottom}
        />
    </imagelabel>
}

export function hoverGui() {

}