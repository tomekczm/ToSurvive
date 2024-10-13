import { Players, RunService, UserInputService } from "@rbxts/services";

const pointer = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("Mouse").WaitForChild("Pointer") as Frame
const mouse = Players.LocalPlayer.GetMouse()

RunService.RenderStepped.Connect(() => {
    UserInputService.MouseIconEnabled = false
    pointer.Position = UDim2.fromOffset(mouse.X, mouse.Y)
})