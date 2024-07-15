import CameraShaker, { Presets } from "@rbxts/camera-shaker"
import { ReplicatedStorage, Workspace } from "@rbxts/services";

const camera = Workspace.CurrentCamera as Camera
export const shake = new CameraShaker(
	Enum.RenderPriority.Camera.Value,
	shakeCFrame => camera.CFrame = camera.CFrame.mul(shakeCFrame)
);

shake.Start()

ReplicatedStorage.Events.CamShake.OnClientEvent.Connect(() => {
	shake.Shake(Presets.Bump)
})