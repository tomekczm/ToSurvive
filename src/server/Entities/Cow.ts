import { RunService, ServerStorage, Workspace } from "@rbxts/services";
import { ANIMAL_RNG, AnimalEntity } from "./Animal";
import { addEntity } from "./Base/Entities";
import { Inventory } from "server/Inventory/Inventory";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { RawMeatItem } from "server/Item/GenericItems";

const cowModel = ServerStorage.Models.Cow
type COW = typeof cowModel;

const RNG = ANIMAL_RNG

const meat = ServerStorage.DroppedItems.Meat

export class CowAnimal extends AnimalEntity<COW> implements EntityController {
    randomStopsTasks!: thread;
    cancelRunning: thread | undefined
    defaultCrazyness: number;
    defaultRotationSpeed: number;
    defaultWalkSpeed: number;

    standState(dt: number) {
        this.timeAlive += dt / this.crazyness;
        this.entity.Humanoid.Move(new Vector3(0,0,0))
    }

    randomStops() {
        while(true) {
            task.wait(RNG.NextInteger(5,25))
            this.state = (dt) => { this.standState(dt) }  
            task.wait(RNG.NextInteger(5, 25))
            this.state = (dt) => { this.defaultState(dt) }  
        }
    }

    startRandomStops() {
        this.randomStopsTasks = task.spawn(() => {
            this.randomStops()
        })
    }

    attackedByPlayer(model: Model) {
        this.state = (dt) => { this.defaultState(dt) }  
        task.cancel(this.randomStopsTasks)
        this.entity.Humanoid.WalkSpeed = 5 // 15
        this.crazyness = 1
        this.rotationSpeed = 10
        if(this.cancelRunning)
            task.cancel(this.cancelRunning)
        this.cancelRunning = task.delay(20, () => {
            if(!this.entity) return
            this.startRandomStops()
            this.entity.Humanoid.WalkSpeed = this.defaultWalkSpeed // 15
            this.crazyness = this.defaultCrazyness
            this.rotationSpeed = this.defaultRotationSpeed
        })
    }
    
    constructor(position: Vector3) {
        super(cowModel.Clone(), 50, 0.5);

        this.entity.Humanoid.Died.Once(() => {
            if(this.randomStopsTasks)
                task.cancel(this.randomStopsTasks)
            if(this.cancelRunning)
                task.cancel(this.cancelRunning)
            const quantity = RNG.NextInteger(1, 3)
            for (let index = 0; index < quantity; index++) {
                const item = Inventory.dropItem(
                    this.entity.GetPivot().Position.add(new Vector3(0, 4, 0)),
                    meat
                )
                if(!item) return
                registerCollectableItem(item, () => {
                    return new RawMeatItem()
                })
            }
        })
        this.defaultCrazyness = this.crazyness;
        this.defaultRotationSpeed = this.rotationSpeed;
        this.defaultWalkSpeed = this.entity.Humanoid.WalkSpeed
        this.startRandomStops();
        this.entity.PivotTo(new CFrame(position))
        this.entity.Parent = Workspace
        addEntity(this.entity, this)
        
    }
}