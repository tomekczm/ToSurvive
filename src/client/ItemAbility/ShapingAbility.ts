import { ClientItem } from "client/Item/ClientItem";
import { SwingAbility } from "./SwingAbility";
import { CollectionService, Players, ReplicatedStorage, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { RaycastParamsBuilder } from "@rbxts/builders";
const mouse = Players.LocalPlayer.GetMouse()
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui

const shapeGuiBillboard = ReplicatedStorage.Prefabs.ShapeGui
const RNG = new Random()
const rotationRange = 30

const hoverPopout = new TweenInfo(0.25)
const SLOT_TWEEN = new TweenInfo(
    0.5,
    Enum.EasingStyle.Sine
)

interface Option {
    image: string, rotation: number, scaleType?: Enum.ScaleType, size?: UDim2
}

const MAX_DISTANCE = 10;

export class ShapingAbility extends SwingAbility {
    highlightConnection: RBXScriptConnection | undefined;
    currentResource: Model | undefined;
    attachments: Attachment[] = [];
    localSwingEvent?: BindableEvent<Callback>;
    options: Option[];
    choosenOption?: Option;

    constructor(item: ClientItem<Model>, options: Option[]) {
        super(item);
        this.options = options;
    }

    localSwing(): void {
        this.localSwingEvent?.Fire()
        super.localSwing()
    }

    findResourcePointedAt() {
        const { Instance } = mouse.GetTarget(
            new RaycastParamsBuilder()
                .AddToFilter(...CollectionService.GetTagged("DroppedItem"))
                .Build()
        );
        
        if(!Instance) return;
        const model = Instance.FindFirstAncestorOfClass("Model")
        const character = Players.LocalPlayer.character
        
        if(!character) return;

        if(!model) return;

        const characterPosition = character.GetPivot().Position
        const modelPosition = model.GetPivot().Position;
        const magnitude = new Vector3(characterPosition.X, modelPosition.Y, characterPosition.Z).sub(modelPosition).Magnitude

        if(magnitude > MAX_DISTANCE) return;

        if(CollectionService.HasTag(model, "Resource")) {
            return model
        }
        return undefined
    }


    clearShapingImages() {
        for(const attachment of this.attachments) {
            attachment.Destroy()
        }
        this.attachments = []
    }

    generateShapingImages() {
        this.clearShapingImages()

        const currentResource = this.currentResource
        const camera = Workspace.Camera

        const options = this.options;

        if(!currentResource || !camera) return

        let [position, size] = currentResource.GetBoundingBox();

        size = new Vector3(
            math.min(10, size.X),
            math.min(10, size.Y),
            math.min(10, size.Z),
        )
        


        // Track positions to avoid overlap
        const placedPositions: Vector2[] = []
        const ACCEPTABLE_DISTANCE = 0.25
        const ALLOWED_RETRIES = 20
        const FROM_RANGE = 0.20
        const TO_RANGE = 0.80

        // Function to find a position that's not too close to others
        const findValidPosition = (): Vector2 => {
            let bestCandidate: Vector2 | undefined = undefined
            let bestDistance = 0

            for (let attempt = 0; attempt < ALLOWED_RETRIES; attempt++) {
                const candidate = new Vector2(
                    RNG.NextNumber(FROM_RANGE, TO_RANGE),
                    RNG.NextNumber(FROM_RANGE, TO_RANGE)
                )
                
                let minDist = math.huge
                for (const pos of placedPositions) {
                    const dist = pos.sub(candidate).Magnitude
                    if (dist < minDist) {
                        minDist = dist
                    }
                }

                if (minDist > bestDistance) {
                    bestDistance = minDist
                    bestCandidate = candidate
                }

                if (minDist >= ACCEPTABLE_DISTANCE) {
                    return candidate
                }
            }

            return bestCandidate || new Vector2(
                RNG.NextNumber(FROM_RANGE, TO_RANGE),
                RNG.NextNumber(FROM_RANGE, TO_RANGE)
            )
        }

        const displayOption = (option: Option) => {
            // Find a position that's not too close to others
            const positionOnPlane = findValidPosition()
            placedPositions.push(positionOnPlane)
            
            

            const attachment = new Instance("Attachment")
            const gui = shapeGuiBillboard.Clone()

            // Configure GUI appearance
            if(option.image) {
                gui.Frame.ImageLabel.Image = option.image
            }
            if(option.rotation) {
                gui.Frame.ImageLabel.Rotation = option.rotation
            }
            if(option.scaleType) {
                gui.Frame.ImageLabel.ScaleType = option.scaleType
            }
            if(option.size) {
                gui.Frame.ImageLabel.Size = option.size
            }
            
            let isOver = false

            // Mouse hover effects
            gui.Frame.ImageLabel.MouseEnter.Connect(() => {
                isOver = true
                TweenService.Create(
                    gui.Frame.Resizer, hoverPopout, { Scale: 0.75 }
                ).Play()
            })
            
            gui.Frame.ImageLabel.MouseLeave.Connect(() => {
                isOver = false
                TweenService.Create(
                    gui.Frame.Resizer, hoverPopout, { Scale: 0.5 }
                ).Play()
            })

            // Handle selection
            const inputConnection = this.localSwingEvent?.Event.Connect(() => {
                if(isOver) {
                    this.currentResource = undefined
                    this.choosenOption = option;
                    this.clearShapingImages()
                    inputConnection?.Disconnect()
                }
            })

            // Setup and animate
            const scaler = TweenService.Create(
                gui.Frame.Resizer, SLOT_TWEEN,
                { Scale: 0.5 }
            )
            scaler.Play()

            attachment.Parent = Workspace.Terrain
            attachment.Visible = true
            this.attachments.push(attachment)

            const goal = {
                Rotation: RNG.NextNumber(-rotationRange, rotationRange)
            }
        
            const tween = TweenService.Create(
                gui.Frame, SLOT_TWEEN,
                goal
            )
        
            tween.Play()
        
            const toRotate = gui.Frame.Background
            const gradient = toRotate.UIGradient
        
            let isCompleted = false

            scaler.Completed.Once(() => {
                isCompleted = true
            })

            const rotation = goal.Rotation
            const connection = RunService.RenderStepped.Connect((dt) => {
                // Dynamically update the plane position and orientation based on player's position and camera
                let resourcePosition = currentResource.GetPivot().Position
                let character = Players.LocalPlayer.character;

                assert(character)

                resourcePosition = new Vector3(
                    resourcePosition.X,
                    character.GetPivot().Y,
                    resourcePosition.Z,
                )

                const lookVector = camera.CFrame.LookVector
                const planeNormal = new Vector3(-lookVector.X, 0, -lookVector.Z).Unit
                const planeCFrame = CFrame.lookAt(resourcePosition, resourcePosition.add(planeNormal))
                
                // Calculate 3D position on the plane
                const xOffset = (positionOnPlane.X - 0.5) * size.X
                const yOffset = (positionOnPlane.Y - 0.5) * size.Y
                const pointOnPlane = planeCFrame.mul(new CFrame(xOffset, yOffset, 0))
                
                // Update attachment position
                attachment.WorldCFrame = pointOnPlane
                
                // Update position to follow attachment in screen space
                const [screenPos] = camera.WorldToViewportPoint(attachment.WorldPosition)
                gui.Frame.Position = UDim2.fromOffset(
                    screenPos.X,
                    screenPos.Y
                )
                
                // Rotate background
                if (isCompleted) {
                    const delta = rotation * (dt / 1)
                    toRotate.Rotation += delta
                }
                gradient.Rotation = -toRotate.Rotation - gui.Frame.Rotation + 90
            })

            // Cleanup
            attachment.Destroying.Once(() => {
                connection.Disconnect()
                gui.Destroy()
                inputConnection?.Disconnect()
            })

            gui.Parent = playerGui
        }
        
        if(this.choosenOption) {
            displayOption(this.choosenOption)
        } else {
            for (const option of options) {
                displayOption(option)
            }
        }
    }

    onEquip(): void {
        this.localSwingEvent = new Instance("BindableEvent");
        this.highlightConnection?.Disconnect()
        this.highlightConnection = RunService.RenderStepped.Connect(() => {
            const previousResource = this.currentResource
            this.currentResource = this.findResourcePointedAt()

            if(previousResource !== this.currentResource) {
                if(previousResource !== undefined) {
                    this.choosenOption = undefined;
                }
                this.generateShapingImages();
            }
        })
        super.onEquip()
    }

    onUnequip(): void {

        this.choosenOption = undefined;

        this.localSwingEvent?.Destroy()
        this.currentResource = undefined
        this.highlightConnection?.Disconnect()
        this.currentResource = undefined;
        this.clearShapingImages()
        super.onUnequip()
    }
}