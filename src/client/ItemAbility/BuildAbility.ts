import { CollectionService, Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { Ability } from "shared/Ability";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { ClientItem } from "client/Item/ClientItem";
import { SetProximity } from "client/ProximityPrompts";
import { InputBeganEvent } from "./EventInterfaces";
import { addKeyHint } from "client/UI/KeyHint";
import { isInFirstPerson } from "client/FirstPersonMode";

const localPlayer = Players.LocalPlayer
const mouse = localPlayer.GetMouse()
const playerGui = localPlayer.WaitForChild("PlayerGui") as PlayerGui


export abstract class BuildAbility extends Ability<ClientItem> implements InputBeganEvent {
    buildConnection: RBXScriptConnection | undefined;
    dragConnection: RBXScriptConnection | undefined;

    snapping = false
    buildEvent = this.item.fetchEvent("Build")
    dragged: Model | undefined;
    position: CFrame | BasePart | undefined;
    currentRecipe: Recipe<Item<Instance>, Model> | undefined;
    private snappingHint: ImageLabel | undefined;

    setHiglights(mode: boolean) {
        const highlights = CollectionService.GetTagged("BuildingHighlight")
        for(const highlight of highlights) {
            if(highlight.IsA("Highlight")) {
                highlight.Enabled = mode
            }
        }
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
    }

    inputBegan(input: InputObject): void {
        if(input.KeyCode === Enum.KeyCode.Z) {
            this.snapping = !this.snapping
        }
    }

    startBuilding(instance: Model) {
        const clone = instance.Clone()
        clone.Parent = Workspace

        for(const prompt of clone.GetDescendants()) {
            if(prompt.IsA("ProximityPrompt")) SetProximity(prompt, false)
        }

        this.dragged = clone
        this.dragConnection = RunService.RenderStepped.Connect(() => {
            this.moveObject()
        })
    }

    restart() {
        this.dragConnection?.Disconnect()
        this.currentRecipe = undefined;
        this.dragged?.Destroy()
    }

    moveObject() {
        if(!this.dragged) return
        const mousePos = UserInputService.GetMouseLocation();
        const params = new RaycastParams()
        params.RespectCanCollide = true
        params.AddToFilter(this.dragged)
        const character = localPlayer.Character
        if(!character) return
        
        params.AddToFilter(character)

        const camera = Workspace.CurrentCamera
        if(!camera) return

		const unitRay = camera.ScreenPointToRay(mousePos.X, mousePos.Y)

        const pivot = character.GetPivot()

        const RAY_RANGE = isInFirstPerson() ? 10 : 5;
        const vector = pivot.LookVector.mul(RAY_RANGE)
        const firstRay = Workspace.Raycast(pivot.Position, vector, params)
        const positionFront = (firstRay) ? firstRay.Position : pivot.Position.add(vector);
        const secondRay = Workspace.Raycast(positionFront, new Vector3(0, -30, 0), params)
        if(!secondRay) return
		const ray = Workspace.Raycast(unitRay.Origin, unitRay.Direction.mul(500), params)
        if(!ray) return
        for(const descendant of this.dragged.GetDescendants()) {
            if(!descendant.IsA("BasePart")) continue
            descendant.CanCollide = false
            descendant.Transparency = 0.8
        }

        const IsAttachedPart = ray.Instance.Name === "BuildingAttach"
        const position = (IsAttachedPart) ? ray.Instance.GetPivot().Position : (this.snapping) ? ray.Position : secondRay.Position;

        const rotation = character?.GetPivot().Rotation!
        const _rotationOffset = this.dragged.GetAttribute("RotationOffset") as Vector3 ?? new Vector3(-90,0,0)
        const rotationOffset = CFrame.Angles(math.rad(_rotationOffset.X), math.rad(_rotationOffset.Y), math.rad(_rotationOffset.Z))
        const finalPosition = (!this.snapping) ? new CFrame(position).mul(rotation) : new CFrame(position, position.add(ray.Normal)).mul(rotationOffset)

        this.dragged.PivotTo(finalPosition)
        this.position = (IsAttachedPart) ? ray.Instance : finalPosition
    }

}