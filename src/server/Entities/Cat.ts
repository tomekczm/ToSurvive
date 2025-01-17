import { RunService, ServerStorage, Workspace } from "@rbxts/services";
import { sample, sampleAlternative } from "shared/Array";

const CAT_MODEL = ServerStorage.Models.WaitForChild("Cat") as Model

type CAT = ServerStorage["Models"]["Cat"]

const RNG = new Random()

const catTextures = [
    "http://www.roblox.com/asset/?id=13333189485",
    "http://www.roblox.com/asset/?id=5430597512",
    "http://www.roblox.com/asset/?id=15075907591",
    "http://www.roblox.com/asset/?id=14292312398",
    "http://www.roblox.com/asset/?id=18421588829"
]
const catColors = [
    new Color3(1,1,1),
    new Color3(0,0,0),
    Color3.fromRGB(153,98,50),
    Color3.fromRGB(211,145,101),
    Color3.fromRGB(222,163,105),
    Color3.fromRGB(234,212,180),
    Color3.fromRGB(143,125,111),
    Color3.fromRGB(89,86,76)
]

export function biasedRandomInt(low: number, high: number, exponent = 2): number {
    // math.random() gives a floating-point number in [0, 1)
    const x = RNG.NextNumber(0, 1)

    // Apply a bias by raising x to a power > 1 (e.g., 2)
    // Higher exponents push results closer to 0, thus skewing towards low numbers.
    const xBiased = x ** 2

    // Scale and shift to get an integer in [low, high]
    // (high - low + 1) is the size of the integer range
    return math.floor(xBiased * (high - low + 1)) + low
}

export class Cat {
    stateConnection!: RBXScriptConnection;
    state: (dt: number) => void;

    meowSounds: Sound[] = []

    timeAlive: number = 0;
    entity: CAT;
    localOffset: number;
    crazyness: number;
    zoomies: thread;
    zoomies2: thread;
    meows: thread;
    images: thread;

    defaultState(dt: number) {
        this.timeAlive += dt / this.crazyness;
        const position = this.entity.GetPivot().Position
        const noise = (math.noise(this.timeAlive + this.localOffset) + 1) * 360
        
        this.entity.PivotTo(
            new CFrame(position).mul(CFrame.Angles(0, math.rad(noise), 0))
        )
        const pivot = this.entity.GetPivot()
        const humanoid = this.entity.Humanoid
        humanoid.MoveTo(pivot.mul(pivot.LookVector.mul(10)))
    }

    meow() {
        const meow = sampleAlternative(RNG, this.meowSounds)
        if(meow.IsA("Sound")) meow.Play()
    }

    constructor(position: Vector3) {
        const model = CAT_MODEL.Clone()
        model.Parent = Workspace
        model.PivotTo(new CFrame(position))

        this.entity = model as CAT;

        this.entity.ScaleTo(
            RNG.NextNumber(1, 2)
        )

        const walkSpeed = RNG.NextNumber(1, 5)
        const humanoid = this.entity.Humanoid

        this.zoomies = task.spawn(() => {
            while(true) {
                task.wait(RNG.NextNumber(1, 30))
                humanoid.WalkSpeed = walkSpeed * 10;
                task.wait(biasedRandomInt(0.1, 0.5, 2))
                humanoid.WalkSpeed = walkSpeed
            }
        })

        this.zoomies2 = task.spawn(() => {
            while(true) {
                task.wait(RNG.NextNumber(1, 30))
                const crazyness = this.crazyness
                this.crazyness *= 0.1;
                task.wait(biasedRandomInt(0.5, 100, 2))
                this.crazyness = crazyness;
            }
        })

        this.meows = task.spawn(() => {
            while(true) {
                task.wait(RNG.NextNumber(1, 30))
                this.meow()
            }
        })

        this.images = task.spawn(() => {
            while(true) {
                task.wait(RNG.NextNumber(5, 5))
                const texture = sampleAlternative(RNG, catTextures)
                const emitter = this.entity.HumanoidRootPart.ParticleEmitter
                emitter.Texture =  texture
                emitter.Size = new NumberSequence(RNG.NextNumber(0.1, 1))
                emitter.Emit(RNG.NextNumber(5, 100)) 
                this.meow()
            }
        })

        const humanoidRootPart = this.entity.HumanoidRootPart
        humanoid.WalkSpeed = walkSpeed;
        const color = sampleAlternative(RNG, catColors)
        humanoidRootPart.Mesh.VertexColor = new Vector3(
            color.R, color.G, color.B
        )
        this.localOffset = RNG.NextNumber(10, 100)
        this.crazyness = RNG.NextNumber(1, 10)

        const heteroChromia = RNG.NextInteger(1, 2) === 1;
        
        const leftEye = humanoidRootPart.LeftEye.ParticleEmitter
        const rightEye = humanoidRootPart.RightEye.ParticleEmitter
        let eyes = [ leftEye, rightEye ]

        const whiteEyes = new ColorSequence(new Color3(1,1,1))
        const blackEyes = new ColorSequence(new Color3(0,0,0))

        if(heteroChromia) {
            let firstIndex = RNG.NextInteger(0, 1);
            let secondIndex = (firstIndex === 1) ? 0 : 1;
            eyes[firstIndex].Color = blackEyes
            eyes[secondIndex].Color = whiteEyes
        } else {
            const eyesColor = sampleAlternative(RNG, [ whiteEyes, blackEyes ])
            eyes[0].Color = eyesColor
            eyes[1].Color = eyesColor
        }

        humanoidRootPart.GetChildren().forEach((child) => {
            if(child.IsA("Sound")) {
                this.meowSounds.push(child)
            }
        })

        this.state = (dt) => { this.defaultState(dt) }
        task.defer(() => {
            this.stateConnection = RunService.Heartbeat.Connect((dt) => {
                this.state(dt)
            })
        })
    }
}