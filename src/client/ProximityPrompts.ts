import { CollectionService, Players, RunService, Workspace } from "@rbxts/services"

const mouse = Players.LocalPlayer.GetMouse()

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
        if(!model) return;
    }
    prevModel = model

    // Iterate over the model's descendants
    for (const descendant of model.GetDescendants()) {
        if (!descendant.IsA("ProximityPrompt")) continue
        const isEnabled = descendant.GetAttribute("CanEnable")
            // Enable prompt if valid and not already active
        if(isEnabled) {
            if (!currentPrompts.has(descendant)) {
                descendant.Enabled = true;
                currentPrompts.add(descendant);
            }
        } else {
            descendant.Enabled = false;
            currentPrompts.delete(descendant);
        }
    
    }
});
