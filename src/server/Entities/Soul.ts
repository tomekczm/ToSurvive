import { Debris, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { RockItem } from "server/Item/Rock";

const directional = new Random();

const Template = ServerStorage.Models.Soul

//add an item that attracts souls
//maybe with an lantern like design
export class Soul {
    constructor(position: Vector3) {
        const SoulModel = Template.Clone();
        SoulModel.PivotTo(new CFrame(position))
        SoulModel.Parent = Workspace
        let oldDirection = directional.NextUnitVector().mul(10)
        let nextDirection = directional.NextUnitVector().mul(10)
        let delta = 0;
        const connection = RunService.Heartbeat.Connect((dt) => {
            const pivot = SoulModel.GetPivot();
            delta += dt;
            if(delta >= 1) {
                delta = 0;
                oldDirection = nextDirection
                nextDirection = directional.NextUnitVector().mul(10);
            }
            const newDirection = oldDirection.Lerp(nextDirection, delta);
            const final = new CFrame(pivot.Position, pivot.Position.add(newDirection))
            const reallyFInal = final.add(final.LookVector.mul(-dt))
            SoulModel.PivotTo(reallyFInal)
        })
        SoulModel.Destroying.Once(() => {
            connection.Disconnect()
        })
        Debris.AddItem(SoulModel, 120)
        registerCollectableItem(
            SoulModel,
            () => { return new RockItem() }
        )
    }
}