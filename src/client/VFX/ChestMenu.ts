import { Lighting, Players, ReplicatedStorage, RunService, SoundService, TweenService, UserInputService } from "@rbxts/services";
import { Item } from "shared/Item";
import { PlaySound } from "shared/Sound";

const OpenChestEvent = ReplicatedStorage.Events.Inventory.OpenChest

const blur = new Instance("BlurEffect")
const correction = new Instance("ColorCorrectionEffect")

blur.Parent = Lighting
correction.Parent = Lighting

blur.Size = 0;
correction.TintColor = new Color3(1,1,1)

const blurEnableTween = TweenService.Create(
    blur, new TweenInfo(0.25), { Size: 56 }
)

const correctionEnableTween = TweenService.Create(
    correction, new TweenInfo(0.25), 
    { 
        TintColor: Color3.fromRGB(108, 108,108), 
        Saturation: -1, 
        //Contrast: 1
     }
)

const modalButton = new Instance("TextButton")
modalButton.Modal = true

const screenGui = new Instance("ScreenGui")
screenGui.Name = "ChestGui"
screenGui.Parent = Players.LocalPlayer.WaitForChild("PlayerGui")
screenGui.DisplayOrder = 2

const hoverPopout = new TweenInfo(0.25)

const FRAME = new Instance("Frame") as Frame & {
    Resizer: UIScale,
    ImageLabel: ImageLabel,
    Background: typeof ReplicatedStorage.Prefabs.SlotFrame
}
FRAME.AnchorPoint = new Vector2(0.5, 0.5)
FRAME.Position = new UDim2(
    0.5, 0, 1, -75
)

const SLOT_FRAME_TEMPLATE = ReplicatedStorage.Prefabs.SlotFrame.Clone()

const frameTemplate = new Instance("ImageLabel")
frameTemplate.Size = UDim2.fromOffset(125, 125)
frameTemplate.AnchorPoint = new Vector2(0.5, 0.5)
frameTemplate.Name = "ImageLabel"

const scale = new Instance("UIScale")
scale.Parent = FRAME
scale.Name = "Resizer"
scale.Scale = 1.25

frameTemplate.Position = UDim2.fromScale(0.5, 0.5)
frameTemplate.BackgroundTransparency = 1;

frameTemplate.ZIndex = 1

SLOT_FRAME_TEMPLATE.Position = UDim2.fromScale(0.5,0.5)
SLOT_FRAME_TEMPLATE.AnchorPoint = new Vector2(0.5,0.5)
SLOT_FRAME_TEMPLATE.ZIndex = frameTemplate.ZIndex - 1
SLOT_FRAME_TEMPLATE.Name = "Background"

SLOT_FRAME_TEMPLATE.Parent = FRAME
frameTemplate.Parent = FRAME

const RNG = new Random()
const rotationRange = 30

const SLOT_TWEEN = new TweenInfo(
    1,
    Enum.EasingStyle.Sine
)
const ACCEPTABLE_DISTANCE = 0.25
const ALLOWED_RETRIES = 20

export const slotMap = new Map<GuiObject, Item>()

const FROM_RANGE = 0.20
const TO_RANGE = 0.80

function pickGoalPoint(
    otherVectors: Vector2[], 
): UDim2 {
    let bestCandidate: UDim2 | undefined = undefined;
    let bestDistance = 0;

    for (let attempt = 0; attempt < ALLOWED_RETRIES; attempt++) {
        const candidate = UDim2.fromScale(
            RNG.NextNumber(FROM_RANGE, TO_RANGE),
            RNG.NextNumber(FROM_RANGE, TO_RANGE)
        );
        
        const candidateVec = new Vector2(candidate.X.Scale, candidate.Y.Scale);
        let minDist = math.huge;
        for (const v of otherVectors) {
            const dist = v.sub(candidateVec).Magnitude;
            if (dist < minDist) {
                minDist = dist;
            }
        }

        if (minDist > bestDistance) {
            bestDistance = minDist;
            bestCandidate = candidate;
        }

        if (minDist >= ACCEPTABLE_DISTANCE) {
            return candidate;
        }
    }


    if (bestCandidate) {
        return bestCandidate;
    } else {
        return UDim2.fromScale(
            RNG.NextNumber(FROM_RANGE, TO_RANGE),
            RNG.NextNumber(FROM_RANGE, TO_RANGE)
        );
    }
}

function popupItem(item: Item, otherVectors: Vector2[]) {

    let goalPoint = pickGoalPoint(otherVectors)
    otherVectors.push(new Vector2(goalPoint.X.Scale, goalPoint.Y.Scale))
    const slotFrame = FRAME.Clone()
    const thumbnail = item.getThumbnail()
    slotFrame.ImageLabel.Image = thumbnail;
    slotFrame.Parent = screenGui

    const scale = slotFrame.Resizer
    const background = slotFrame.Background
    let isOver = false;
    background.MouseEnter.Connect(() => {
        isOver = true
        TweenService.Create(
            scale, hoverPopout, { Scale: 1.5 }
        ).Play()
    })

    background.MouseLeave.Connect(() => {
        isOver = false
        TweenService.Create(
            scale, hoverPopout, { Scale: 1.25 }
        ).Play()
    })

    const goal = {
        Position: goalPoint,
        Rotation: RNG.NextNumber(-rotationRange, rotationRange)
    }
    //print(goal.Rotation)

    slotMap.set(slotFrame.Background, item)


    const tween = TweenService.Create(
        slotFrame, SLOT_TWEEN,
        goal
    )

    tween.Play()

    const toRotate = slotFrame.Background
    const gradient = toRotate.UIGradient

    let isCompleted = false
    const rotation = goal.Rotation
    const connection = RunService.RenderStepped.Connect((dt) => {
        if (isCompleted) {
            const delta = rotation * (dt / SLOT_TWEEN.Time)
            toRotate.Rotation += delta
        }
        gradient.Rotation = -toRotate.Rotation - slotFrame.Rotation + 90
    })

    tween.Completed.Once(() => {
        isCompleted = true
    })

    const inputConnection = UserInputService.InputBegan.Connect((input) => {
        if(input.UserInputType === Enum.UserInputType.MouseButton1 && isOver) {
            slotMap.delete(slotFrame.Background) // i thought this would get gced :(
            slotFrame.Destroy()
            // will i have to do this with other maps?
            // crap (family friendly)
            isOver = false
            PlaySound(SoundService.SoundGroup.Grab, 0.75, 1.25)
            connection.Disconnect()
            inputConnection.Disconnect()
            if(slotMap.size() === 0) {
                modalButton.Parent = undefined
                blur.Size = 0
                correction.TintColor = new Color3(1,1,1)
                correction.Saturation = 0
            }
        }
    })
}

function openChest() {
    const sword = new Item(ReplicatedStorage.Tools.Sword.Clone())
    const items = [ sword, sword, sword,sword, sword, sword ]
    const otherVectors: Vector2[] = []

    modalButton.Parent = screenGui
    blurEnableTween.Play()
    correctionEnableTween.Play()

    PlaySound(SoundService.SoundGroup.StruckGold, 1,1)

    for(let item of items) {
        task.delay(RNG.NextNumber(0, 0.25), () => {
            popupItem(item, otherVectors)
        })
    }
}

OpenChestEvent.OnClientEvent.Connect(async () => {
    const { unequipCurrentItem } = await import("client/Inventory/Inventory");
    unequipCurrentItem()
    openChest()
})