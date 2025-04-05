import { RunService } from "@rbxts/services";

type Function = (o: unknown, dt: number) => void

export class Entity {

    private connection;
    private stateFunction: Function | undefined = undefined;

    constructor() {
        this.connection = RunService.Heartbeat.Connect((dt) => {
            if(this.stateFunction === undefined) return
            this.stateFunction(this, dt)
        })
    }

    setState(name: string) {
        this.stateFunction = (this as unknown as Map<string, Function>)!.get(name);
    }

    cleanUp() {
        this.connection.Disconnect();
    }
}