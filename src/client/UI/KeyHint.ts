import { Players, ReplicatedStorage } from "@rbxts/services";

const frame = Players.LocalPlayer.WaitForChild("PlayerGui")
                        .WaitForChild("KeyHints")
                        .WaitForChild("Frame")
const keyHint = ReplicatedStorage.Prefabs.KeyHint

let imageKeys = new Map<string, string>([
    [ "Shift", "rbxasset://textures/ui/Controls/shift.png" ]
])

let counter = 1;
export function addKeyHint(key: string, content: string) {
    const clone = keyHint.Clone()

    const imageKey = imageKeys.get(key)
    if(imageKey !== undefined) {
        clone.KeyImage.Image = imageKey
        clone.KeyImage.Visible = true
    } else {
        clone.Key.Text = key
        clone.Key.Visible = true
    }
    clone.Content.Text = content
    clone.Parent = frame
    counter--;
    clone.LayoutOrder = counter 
    return clone;
}