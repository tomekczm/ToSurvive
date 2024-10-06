import { Lighting, SoundService, TweenService } from "@rbxts/services";

function hurtBlur(size: number) {
    TweenService.Create(
        Lighting.HurtBlur,
        new TweenInfo(0.25),
        {
            Size: size
        }
    ).Play()
}

function tintColor(tintColor: Color3) {
    TweenService.Create(
        Lighting.HurtCorrection,
        new TweenInfo(0.25),
        {
            TintColor: tintColor
        }
    ).Play()
}

// 1 = no health, 0 = full health
export function Enable(deathProcentage: number) {
    for(const child of SoundService.Damaged.GetChildren()) {
        if(deathProcentage >= 0.7) {
            SoundService.AmbientReverb = Enum.ReverbType.UnderWater
            Lighting.HurtBlur.Enabled = true
            hurtBlur(8)

            if(child.IsA("Sound")) {
                child.Volume = deathProcentage
                child.Play()
            }
        }
        tintColor(new Color3(1,1,1).Lerp(new Color3(1,0,0), deathProcentage))
    }
}