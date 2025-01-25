import { CollectionService, Players, RunService, Workspace } from "@rbxts/services"
import { hurtHighlight } from "./VFX/HurtHighlight";

const mouse = Players.LocalPlayer.GetMouse()

const highlight = new Instance("Highlight")
highlight.DepthMode = Enum.HighlightDepthMode.Occluded
highlight.OutlineTransparency = 0;
highlight.FillTransparency = 1;
highlight.FillColor = new Color3(1,0,0)
highlight.Parent = Players.LocalPlayer.WaitForChild("PlayerGui")

export function ImpulseProximity() {
    hurtHighlight(highlight)
}

export function SetPrompts(name: string, state: boolean) {
    const prompts = CollectionService.GetTagged(name)
    for(const prompt of prompts) {
        if(!prompt.IsA("ProximityPrompt") || !prompt.IsDescendantOf(Workspace)) continue;
        SetProximity(prompt, state)
    }
}

export function SetProximity(prompt: ProximityPrompt, state: boolean) {
    prompt.SetAttribute("CanEnable", state)
}

const currentPrompts = new Set<ProximityPrompt>();

let prevModel: Model
RunService.RenderStepped.Connect(() => {
    const target = mouse.Target;

    if (!target) {
        // Disable all currently enabled prompts if there's no valid target
        for (const prompt of currentPrompts) {
            prompt.Enabled = false;
        }
        highlight.Adornee = undefined;
        currentPrompts.clear();
        return;
    }

    // Find the model ancestor of the target
    const model = target.FindFirstAncestorOfClass("Model");
    if (!model || model !== prevModel) {
        // No valid model, disable all prompts
        for (const prompt of currentPrompts) {
            prompt.Enabled = false;
        }
        currentPrompts.clear();
        if(!model) {
            highlight.Adornee = undefined;
            return
        };
    }
    prevModel = model
    if(model.GetAttribute("Highlight")) {
        highlight.Adornee = model;
        return
    }
    // Iterate over the model's descendants
    for (const descendant of model.GetDescendants()) {
        if (!descendant.IsA("ProximityPrompt")) continue
        const isEnabled = descendant.GetAttribute("CanEnable")
            // Enable prompt if valid and not already active
        if(isEnabled) {
            if (!currentPrompts.has(descendant)) {
                highlight.Adornee = model;
                descendant.Enabled = true;
                currentPrompts.add(descendant);
            }
        } else {
            descendant.Enabled = false;
            currentPrompts.delete(descendant);
        }
    
    }
});
