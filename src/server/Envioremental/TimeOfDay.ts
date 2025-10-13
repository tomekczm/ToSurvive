import { Lighting, RunService } from "@rbxts/services";
import { Zombie } from "../Entities/Hostile/Zombie";

const RANDOM_SPAWNER = new Random();

const size = 150;
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

let overdrive = 0;
RunService.Heartbeat.Connect((dt) => {
    overdrive += dt * 0.1 // 0.0125

    if(overdrive >= 0.001) {
        Lighting.ClockTime += overdrive
        overdrive = 0;
    }

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

new Zombie(new Vector3(300, 150 ,0))

function randomSpawn() {
    while(true) {
        let axis = RANDOM_SPAWNER.NextNumber(0, peremiter)
    
        const vector = getBorderPosition(axis).add(new Vector3(0,10,0));
        new Zombie(vector)
        task.wait(5)
    }
}