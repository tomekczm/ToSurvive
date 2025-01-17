import { Players, ServerStorage } from "@rbxts/services";
import { SwordItem } from "./Item/Sword";
/*
Players.PlayerAdded.Connect((plr) => {
    const item = new SwordItem()
    item.setOwnership(plr)
    plr.CharacterAdded.Connect((character) => {
        task.wait(1)
        item.equip()
    })
})
*/
import "./Inventory/Inventory"
import "./PreloadAnimations"
import "./Terrain/Main"
import "./TimeOfDay"
import "./Envioremental/Weather"
import "./Terrain/Structures/Village"
import { Zombie } from "./Entities/Zombie";
import { Cat } from "./Entities/Cat";
new Cat(new Vector3(0, 100, 0))
//for(let i = 0; i < 20; i++) {
//    new Cat(new Vector3(0, 100, 0))
//    task.wait(1)
//}