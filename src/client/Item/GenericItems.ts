import { ClientItem } from "./ClientItem"

type Constraint = ReplicatedStorage["Tools"]["Flint"]
export class FlintItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
    }
}

type RawMeat = ReplicatedStorage["Tools"]["Flint"]
export class RawMeatItem extends ClientItem<RawMeat> {
    constructor(instance: Instance) {
        super(instance as Constraint)
    }
}

type WoodenLog = ReplicatedStorage["Tools"]["Wooden Log"]
export class WoodenLogItem extends ClientItem<WoodenLog> {
    constructor(instance: Instance) {
        super(instance as Constraint)
    }
}