import { ClientItem } from "./ClientItem"

type Constraint = ReplicatedStorage["Tools"]["Flint"]
export class FlintItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
    }
}