import { Players, ReplicatedStorage } from "@rbxts/services";

const frame = Players.LocalPlayer.WaitForChild("PlayerGui")
                        .WaitForChild("KeyHints")
                        .WaitForChild("Frame")
const keyHint = ReplicatedStorage.Prefabs.KeyHint

let counter = 1;
export function addKeyHint(key: string, content: string) {
    const clone = keyHint.Clone()
    clone.Key.Text = key
    clone.Content.Text = content
    clone.Parent = frame
    counter--;
    clone.LayoutOrder = counter 
    return clone;
}