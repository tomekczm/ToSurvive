import { Lighting, RunService } from "@rbxts/services";
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

let isNight = false;
let nightTask: thread | undefined

RunService.Heartbeat.Connect((dt) => {
    Lighting.ClockTime += dt * 0.05

    const isNightNow = Lighting.ClockTime >= 17.6 || Lighting.ClockTime <= 6.3
    if(isNightNow !== isNight) {
        if(!isNight) {
            nightTask = task.spawn(randomSpawn)
        } else if(nightTask) {
            task.cancel(nightTask)
        }
        
        isNight = isNightNow
    }
})

new Zombie(new Vector3(-200, 100 ,0))

function randomSpawn() {
    while(true) {
        let axis = RANDOM_SPAWNER.NextNumber(0, peremiter)
    
        const vector = getBorderPosition(axis).add(new Vector3(0,10,0));
        new Zombie(vector)
        task.wait(5)
    }
}