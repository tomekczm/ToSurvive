import { CollectionService, Debris } from "@rbxts/services";

export function hurtHighlight(model: Model) {
    const item = new Instance("Highlight");
    CollectionService.AddTag(item, "Hurt");

    item.FillColor = new Color3(1,0,0);
    item.FillTransparency = 1
    item.OutlineTransparency = 1
    item.DepthMode = Enum.HighlightDepthMode.Occluded

    item.Adornee = model
    item.Parent = model


    Debris.AddItem(item, 1)
}