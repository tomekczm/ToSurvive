import { Players, ServerStorage } from "@rbxts/services";
import { SwordItem } from "./Item/Sword";
Players.PlayerAdded.Connect((plr) => {
    const item = new SwordItem()
    item.setOwnership(plr)
    plr.CharacterAdded.Connect((character) => {
        task.wait(1)
        item.equip()
    })
})
import "./PreloadAnimations"
import "./Terrain/Main"