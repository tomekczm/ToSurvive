import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { SwingAbility } from "server/ItemAbilities/Swing";

class ShovelSwing extends SwingAbility {
    range = this.item.getAttribute("Range", 20)
    onStart(): void {
        this.item.listenToEvent("Dig", (_position) => {
            const position = _position as Vector3
            const itemPosition = this.item.getPosition()
            const distance = itemPosition.sub(position).Magnitude

            const isInRange = distance < this.range
            if(isInRange)
                Workspace.Terrain.FillBall(position, 5, Enum.Material.Air)
        })
       super.onStart()
    }
}

type Constraint = ReplicatedStorage["Tools"]["Shovel"]
export class ShovelItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Shovel.Clone())
        this.abilityManager.add(new ShovelSwing(this));
    }
}