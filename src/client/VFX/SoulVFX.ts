import { CollectionService, RunService } from "@rbxts/services";
import { getItemFromInstance } from "client/Item/ItemRegistrar";

type SOUL = ServerStorage["Models"]["Soul"]

const SPEED = 1;
const halfFullRotation = CFrame.Angles(0, math.rad(180), 0);

function update(soul: Model, target: Model, dt: number) {
    const targetItem = getItemFromInstance(target)
    if(!targetItem) return
    const position = targetItem.getPosition();
    const pivot = soul.GetPivot();
    const distance = pivot.Position.sub(position).Magnitude;

    function stepPosition(pivot: CFrame) {
        const rotated = new CFrame(pivot.Position, position);
        const lookVector = rotated.LookVector;
        const distanceToTravel = math.min(distance, SPEED * dt);

        const toTravel = lookVector.mul(distanceToTravel);
        return rotated.add(toTravel).mul(halfFullRotation);
    }
    
    let newPosition = stepPosition(pivot)
    const positionMixmatch = soul.GetAttribute("RealPosition") as CFrame;

    if(positionMixmatch) {
        const currentPositionMixmatch = stepPosition(positionMixmatch)
        newPosition = newPosition.Lerp(currentPositionMixmatch, dt / 20)
        soul.SetAttribute("RealPosition", currentPositionMixmatch)
    }

    
    soul.PivotTo(newPosition);
}

RunService.RenderStepped.Connect((dt) => {
    for (const soul of CollectionService.GetTagged("Soul") as SOUL[]) {
        const target = soul.SoulFragment.Value.Value as Model
        if (target) {
            update(soul as Model, target, dt);
        }
    }
}); 