import { TweenService, Workspace } from "@rbxts/services";

const clouds = Workspace.Terrain.WaitForChild("Clouds") as Clouds;

const cover = clouds.GetAttribute("Cover") as number
if(cover) {
    clouds.Cover = cover;
}

clouds.GetAttributeChangedSignal("Cover").Connect(() => {
    const cover = clouds.GetAttribute("Cover") as number
    const cloudTween = TweenService.Create(
        clouds,
        new TweenInfo(10),
        {
            Cover: cover
        }
    ).Play()
})