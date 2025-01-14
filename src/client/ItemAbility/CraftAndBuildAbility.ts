import { Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { Ability } from "shared/Ability";
import { recipes, reverseLookup } from "shared/Recipes/HammerRecipes";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { BuildAbility } from "./BuildAbility";

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

    let text = "Requirements:\n"

    for(const requirement of recipe.requirements) {
        text += requirement.item.getName() + " x" + requirement.quantity + "\n"
    }
    recipeDrag.Description.Text = text
})

export class CraftAndBuildAbility extends BuildAbility {
    inputBegan(input: InputObject): void {
        if(input.KeyCode === Enum.KeyCode.X) {
            this.restart()
        }

        if(input.UserInputType !== Enum.UserInputType.MouseButton1)
            return
    
        const recipe = getRecipeFromInputObject(input)
        if(!recipe) {
            if(this.currentRecipe)
                this.buildEvent.FireServer(reverseLookup.get(this.currentRecipe), this.position)

            return
        }

        this.restart()

        this.startBuilding(recipe.result)
        this.currentRecipe = recipe;
        super.inputBegan(input)
    }

    onEquip(): void {
        buldGui.Visible = true
        super.onEquip();
    }

    onUnequip(): void {
        buldGui.Visible = false
        super.onUnequip()
    }
}