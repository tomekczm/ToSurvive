import { RunService, ServerStorage, Workspace } from "@rbxts/services";
import { sample } from "shared/Array";
export const ANIMAL_RNG = new Random()

interface HumanoidEntity extends Model {
    Humanoid: Humanoid
}

export class AnimalEntity<T extends HumanoidEntity> {
    stateConnection!: RBXScriptConnection;
    state: (dt: number) => void;

    timeAlive: number = 0;
    entity: T;

    localOffset: number;
    crazyness: number;

    weirdMode = false;

    defaultState(dt: number) {
        this.timeAlive += dt / this.crazyness;
        const position = this.entity.GetPivot()
        const cframe = (this.weirdMode) ? new CFrame(position.Position) : position

        const normalization = (this.weirdMode) ? 1 : 0;
        const noise = (math.noise(this.timeAlive + this.localOffset) + normalization) * this.rotationSpeed
        this.entity.PivotTo(
            position.mul(CFrame.Angles(0, math.rad(noise), 0))
        )
        const pivot = this.entity.GetPivot()
        const humanoid = this.entity.Humanoid
        humanoid.Move(pivot.LookVector)
    }

    constructor(model: T, crazyness: number, public rotationSpeed = 360) {
        this.crazyness = crazyness
        this.localOffset = ANIMAL_RNG.NextNumber(0, 100)

        this.entity = model;
        this.state = (dt) => { this.defaultState(dt) }
        task.defer(() => {
            this.stateConnection = RunService.Heartbeat.Connect((dt) => {
                this.state(dt)
            })
        })

        this.entity.Humanoid.Died.Once(() => {
            this.stateConnection.Disconnect()
            task.wait(3)
            this.entity.Destroy()
        })
    }
}