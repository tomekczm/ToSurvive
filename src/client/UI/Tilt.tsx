import { useEventListener, useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Players, RunService } from "@rbxts/services";
import { LocalPlayer } from "client/Character/LocalPlayer";

const setTiltEvent = new Instance("BindableEvent");

let severity = 0;

let regenerationRate = 0;
let maxRegeneration = 10;
let regenerationDelta = 0.01;

let stunlockDuration = 5;
let tiltTripTreshold = 0.9

export function addTilt(angle: number) {
    if(angle > 0) {
        regenerationRate = 0;
    }
    severity = math.clamp(severity + angle, 0, 1)
    setTiltEvent.Fire(severity);
}

function roundUp2Decimals(num: number) {
    return math.ceil(num * 100) / 100
}

RunService.RenderStepped.Connect((dt) => {
    //print(`${roundUp2Decimals(regenerationRate)} rate, ${roundUp2Decimals(severity)} severity`)
    addTilt(-dt * regenerationRate)
    regenerationRate = math.clamp(regenerationRate + (regenerationDelta * dt), 0, maxRegeneration)
})

const tiltAffectingEvents = {
	SwordSwing: 0.05,
	Hit: 0.25,
};

export function tiltAffectingEventHappened(event: keyof typeof tiltAffectingEvents) {
	addTilt(tiltAffectingEvents[event]);

    if(event === 'SwordSwing') {
        let time = 0;
        if(severity >= tiltTripTreshold) {
            const removeEffect = LocalPlayer.statusEffects.addStatusEffect("LostBalance")
            const connection = RunService.RenderStepped.Connect((dt) => {
                time += dt;
                if(time >= stunlockDuration) {
                    connection.Disconnect()
                    removeEffect()
                }
                Players.LocalPlayer.character?.Humanoid.Move(new Vector3(0,0,1), true)
            })
            addTilt(-severity)
        }
    }
}

export function Tilt() {
	const [angle, setAngle] = React.useState(0);
	const [severity, setSeverity] = useMotion(0);
    const [transparency, setTransparency] = useMotion(1)

	useEventListener(setTiltEvent.Event, (severity: number) => {
		setSeverity.spring(severity);
	});


    const computedSeverity = (() => {
		const s = math.clamp(severity.getValue(), 0, 1);
		if (s < 0.5) return 0;
		return (s - 0.5) / 0.5; 
	});
    

    useEventListener(RunService.RenderStepped, (dt) => { 
        const s = math.clamp(computedSeverity(), 0, 1);
        const speed = 1 + s * 4;
        setAngle((prev) => prev + dt * speed); 

        if(severity.getValue() >= 0.4) {
            setTransparency.spring(0)
        } else {
            setTransparency.spring(1)
        }
    });
	return (
		<frame
			BorderSizePixel={0}
			Position={new UDim2(0.495, 0, 0.846, 0)}
			Size={new UDim2(0, 15, 0, 25)}
			BackgroundTransparency={1}
            Rotation={(() => {
                const s = math.clamp(computedSeverity(), 0, 1);
        
                // configurable thresholds
                const BLEND_START = 0.3;
                const BLEND_END = 0.4;
        
                // blend factor between BLEND_START → BLEND_END
                let blend = 0;
                if (s > BLEND_START) {
                    blend = math.clamp((s - BLEND_START) / (BLEND_END - BLEND_START), 0, 1);
                }
        
                // amplitude: 100 at BLEND_START → 50 at BLEND_END
                const amplitude = (1 - blend) * 100 + blend * 50;
        
                // motion source: noise → cos
                const noiseVal = math.noise(angle);
                const cosVal = math.cos(angle);
                const mixed = noiseVal * (1 - blend) + cosVal * blend;
        
                return mixed * amplitude;
            })()}
            
		>
			<imagelabel
				AnchorPoint={new Vector2(0.4, 0.9)}
				BackgroundTransparency={1}
                ImageTransparency={transparency}
				Image="rbxassetid://127409338462289"
				Position={new UDim2(0.367, 0, 0.712, 0)}
				ScaleType={Enum.ScaleType.Fit}
				Size={new UDim2(0, 159, 0, 159)}
                ImageColor3={(() => {
                    return Color3.fromRGB(255, 255, 255).Lerp(
                        Color3.fromRGB(255,84,84),
                        math.pow(
                            math.clamp(computedSeverity(), 0, 1),
                            2
                        )
                    )
                })()}
			/>
		</frame>
	);
}

const player = Players.LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;

const screenGui = new Instance("ScreenGui");
screenGui.Name = "TiltGui";
screenGui.Parent = playerGui;
screenGui.DisplayOrder = 10;

const root = createRoot(screenGui);
root.render(<Tilt />);
