import { Workspace } from "@rbxts/services";

function recalculate() {

}

Workspace.GetAttributeChangedSignal("Weather").Connect(() => {
    recalculate();
})