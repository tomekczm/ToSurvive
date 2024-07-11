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
import "./Building/Hammer"
import { Zombie } from "./Entities/Zombie";


const RANDOM_SPAWNER = new Random();

const size = 300;
const peremiter = 4 * size;

function getBorderPosition(index: number) {
    const normalizedIndex = index % peremiter;
    const halfSize = size / 2
    if(normalizedIndex < size) {
        return new Vector3(normalizedIndex - halfSize, 0, halfSize)
     } else if  (normalizedIndex < 2 * size) {
        return new Vector3(halfSize, 0, halfSize - (normalizedIndex % size))
    } else if (normalizedIndex < 3 * size) {
        return new Vector3(halfSize - (normalizedIndex % size), 0, -halfSize)
    } else {
        return new Vector3(-halfSize, 0, -(halfSize - (normalizedIndex % size)))
    }
}

/*
task.spawn(() => {
    while(true) {
        let axis = RANDOM_SPAWNER.NextNumber(0, peremiter)

        const vector = getBorderPosition(axis).add(new Vector3(0,10,0));
        new Zombie(vector)
        task.wait(math.random(5, 10))
    }
})
*/