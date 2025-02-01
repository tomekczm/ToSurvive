import { Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { Ability } from "shared/Ability";
import { recipes, reverseLookup } from "shared/Recipes/HammerRecipes";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { BuildAbility } from "./BuildAbility";
import { addKeyHint } from "client/UI/KeyHint";
import { ClientItem } from "client/Item/ClientItem";
import { VIEWMODEL_ANIMATOR, type Viewmodel } from "./Viewmodel";

const localPlayer = Players.LocalPlayer
const mouse = localPlayer.GetMouse()
const playerGui = localPlayer.WaitForChild("PlayerGui") as PlayerGui
const buldGui = playerGui
                                    .WaitForChild("BuildGui")
                                    .WaitForChild("Background") as Frame
                    
const recipeDrag = playerGui
                    .WaitForChild("RecipeDrag")
                    .WaitForChild("background") as Frame & { Description: TextBox }

const guiRecipeLookup = new Map<GuiObject, Recipe<Item, Model>>()

const Events = ReplicatedStorage.Events.Building

/*
 const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ImageLabel;
        clone.Parent = buldGui
        clone.Image = recipe.result.thumbnail
        _recipe.index = index
        guiRecipeLookup.set(clone, _recipe)
*/
recipes.forEach((recipe, index) => {
    const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ImageLabel;
    const sizeConstraint = new Instance("UIScale")
    sizeConstraint.Name = "Scaler"
    sizeConstraint.Parent = clone
    clone.Parent = buldGui
    clone.Image = recipe.result.GetAttribute("Thumbnail") as string ?? ""
    guiRecipeLookup.set(clone, recipe)
})

function getRecipeFromInputObject(input: InputObject) {
    const { X, Y } = input.Position;
    const elements = playerGui.GetGuiObjectsAtPosition(X, Y)
    for (const element of elements) {
        const recipe = guiRecipeLookup.get(element)
        if(!recipe) continue
        return recipe
    }
    return
}

UserInputService.InputChanged.Connect((input) => {
    if(input.UserInputType !== Enum.UserInputType.MouseMovement)
        return

    const recipe = getRecipeFromInputObject(input)

    if(!recipe) return recipeDrag.Visible = false

    const { X, Y } = UserInputService.GetMouseLocation()

    recipeDrag.Visible = true
    recipeDrag.Position = UDim2.fromOffset(X, Y) 

    let text = `<b>${recipe.result.Name}</b>`
    text += "\n\nRequirements:\n"

    for(const requirement of recipe.requirements) {
        text += requirement.item.getName() + " x" + requirement.quantity + "\n"
    }
    text = text.sub(0, text.size()-1)
    recipeDrag.Description.Text = text
})

export class CraftAndBuildAbility extends BuildAbility {
    private changeItem: ImageLabel | undefined;


    buildAnimation: AnimationTrack | undefined
    viewmodel: Viewmodel | undefined;

    openRecipeMenu() {
        this.restart()
        buldGui.Visible = true
    }

    inputBegan(input: InputObject): void {
        super.inputBegan(input)
        if(input.KeyCode === Enum.KeyCode.X) {
            this.restart()
        }

        if(input.KeyCode === Enum.KeyCode.C) {
            this.openRecipeMenu();
        }

        if(input.UserInputType !== Enum.UserInputType.MouseButton1)
            return
    
        const recipe = getRecipeFromInputObject(input)
        if(!recipe) {
            if(this.currentRecipe) {
                this.buildEvent.FireServer(reverseLookup.get(this.currentRecipe), this.position)
                this.buildAnimation?.Play()
            }

            return
        }

        this.restart()

        buldGui.Visible = false
        this.startBuilding(recipe.result)
        this.currentRecipe = recipe;
    }

    constructor(item: ClientItem, viewmodel?: Viewmodel) {
        super(item);
        this.viewmodel = viewmodel;
        this.buildAnimation = this.viewmodel?.loadAnimation("VM_Build")
    }

    onEquip(): void {
        this.changeItem = addKeyHint("C", "Change Building")
        this.openRecipeMenu()
        super.onEquip();
    }

    onUnequip(): void {
        buldGui.Visible = false
        this.changeItem?.Destroy()
        super.onUnequip()
    }
}