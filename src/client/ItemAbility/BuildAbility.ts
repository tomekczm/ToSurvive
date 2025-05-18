import { CollectionService, Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { Ability } from "shared/Ability";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { ClientItem } from "client/Item/ClientItem";
import { SetProximity } from "client/ProximityPrompts";
import { InputBeganEvent } from "./EventInterfaces";
import { addKeyHint } from "client/UI/KeyHint";
import { Visualizer } from "@rbxts/visualize";

const localPlayer = Players.LocalPlayer
const mouse = localPlayer.GetMouse()
const playerGui = localPlayer.WaitForChild("PlayerGui") as PlayerGui

const visualizer = new Visualizer({
    alwaysOnTop: true
})

export abstract class BuildAbility extends Ability<ClientItem> implements InputBeganEvent {
    buildConnection: RBXScriptConnection | undefined;
    dragConnection: RBXScriptConnection | undefined;

    snapping = false
    buildEvent = this.item.fetchEvent("Build")
    dragged: Model | undefined;
    position: CFrame | BasePart | undefined;
    currentRecipe: Recipe<Item<Instance>, Model> | undefined;
    private snappingHint: ImageLabel | undefined;
    private rotationHint: ImageLabel | undefined;

    goal?: CFrame = undefined;
    rotationOffset = CFrame.Angles(0,0,0);

    setHiglights(mode: boolean) {
        const highlights = CollectionService.GetTagged("BuildingHighlight")
        for(const highlight of highlights) {
            if(highlight.IsA("Highlight")) {
                highlight.Enabled = mode
            }
        }
    }


    setGoal(goal: CFrame) {
        this.goal = goal;
    }

    updatePosition(dt: number) {
        if(!this.dragged || !this.goal) return
        const drag = 0.001
        this.dragged.PivotTo(this.dragged.GetPivot().Lerp(this.goal, 1 - drag ** dt))
        //this.dragged.PivotTo(this.goal)
    }

    constructor(item: ClientItem) {
        super(item)
    }

    onEquip() {
        this.snappingHint = addKeyHint("Z", "Toggle snapping")
        this.setHiglights(true)
        this.snapping = false
    }

    onUnequip() {
        this.setHiglights(false)
        this.restart()
        this.snappingHint?.Destroy()
        this.rotationHint?.Destroy()
    }

    inputBegan(input: InputObject): void {
        if(input.KeyCode === Enum.KeyCode.Z) {
            this.snapping = !this.snapping
        }
        if(input.KeyCode === Enum.KeyCode.R) {
            this.rotationOffset = CFrame.Angles(0,math.rad(15),0).mul(this.rotationOffset)
        }
    }

    startBuilding(instance: Model) {
        const clone = instance.Clone()
        clone.Parent = Workspace

        for(const instance of clone.GetDescendants()) {
            if(instance.IsA("BasePart")) {
                instance.CanCollide = false
                instance.Anchored = true
            }
            if(instance.IsA("ProximityPrompt")) SetProximity(instance, false)
        }

        this.dragged = clone
        this.dragConnection = RunService.RenderStepped.Connect((dt) => {
            if(UserInputService.IsKeyDown(Enum.KeyCode.R)) {
                this.rotationOffset = CFrame.Angles(0,math.rad(dt * 200),0).mul(this.rotationOffset)
            }
            this.updatePosition(dt)
            this.moveObject()
        })
    }

    restart() {
        this.dragConnection?.Disconnect()
        this.currentRecipe = undefined;
        this.dragged?.Destroy()
    }

    moveObject() {
        const dragged = this.dragged!;
        if(!dragged) return
        const camera = Workspace.CurrentCamera!
        const character = localPlayer.Character!
        
        const params = new RaycastParams()
        params.AddToFilter(dragged)
        params.AddToFilter(character)

        const isMouseLocked = UserInputService.MouseBehavior === Enum.MouseBehavior.LockCenter
        let [_, boundingBox] = dragged.GetBoundingBox()
        boundingBox = new Vector3(boundingBox.X * 0.7, boundingBox.Y, boundingBox.Z * 0.7)

        function raycast(origin: CFrame, direction: Vector3): RaycastResult | undefined {
            return Workspace.Blockcast(
                origin,
                boundingBox,
                direction,
                params
            )
        }

        let finalPosition: CFrame;

        if(isMouseLocked) {
            if(this.rotationHint) {
               this.rotationHint.Destroy()
            }
            // First-person or third-person building
            const maxRange = localPlayer.inFirstPerson ? 10 : 5;
            const characterPivot = character.GetPivot().add(new Vector3(0, character.GetExtentsSize().Y / 2, 0))
            finalPosition = new CFrame(characterPivot.Position).mul(character.GetPivot().Rotation)

            // Forward ray
            const forwardRay = raycast(finalPosition, characterPivot.LookVector.mul(maxRange))
            const forwardDistance = forwardRay ? forwardRay.Distance : maxRange
            finalPosition = finalPosition.add(characterPivot.LookVector.mul(forwardDistance))

            // Downward ray
            const MAX_DOWN_DISTANCE = -30
            const downRay = raycast(finalPosition, new Vector3(0, MAX_DOWN_DISTANCE, 0))
            const downDistance = downRay ? downRay.Distance : MAX_DOWN_DISTANCE
            finalPosition = new CFrame(finalPosition.X, downRay!.Position.Y, finalPosition.Z).mul(finalPosition.Rotation)
    
        } else {
            if(!this.rotationHint) {
                this.rotationHint = addKeyHint("R", "Rotate")
            }
            // Mouse-based building
            const mouseRay = camera.ScreenPointToRay(mouse.X, mouse.Y)
            finalPosition = new CFrame(mouseRay.Origin).mul(this.rotationOffset)
            const mouseHitRay = raycast(finalPosition, mouseRay.Direction.mul(1000))
            const tempPosition = finalPosition.add(mouseRay.Direction.mul(mouseHitRay ? mouseHitRay.Distance : 1000))
            finalPosition = new CFrame(tempPosition.X, mouseHitRay!.Position.Y, tempPosition.Z).mul(finalPosition.Rotation)
        }

        this.setGoal(finalPosition)
    }

}