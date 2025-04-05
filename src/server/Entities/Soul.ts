import { CollectionService, Debris, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { RockItem } from "server/Item/Rock";
import { Entity } from "./Base/Entity";
import type { LanternItem } from "server/Item/Lantern";

const directional = new Random();
const Template = ServerStorage.Models.Soul;
const SPEED = 1;

const UPDATE_INTERVAL = 5; // 1 second interval for position updates
const halfFullRotation = CFrame.Angles(0, math.rad(180),0)

// this whole thing probably is really inefficient network wise but
export class Soul extends Entity {

    delta = 0;
    oldDirection: Vector3;
    nextDirection: Vector3;
    soulModel: typeof Template;

    nextUpdate: thread | undefined = undefined

    targetTo: LanternItem | undefined

    public static registry = new Set<Soul>();

    lastUpdateTime = 0;
    calculatedPosition: CFrame | undefined;

    distanceTo(position: Vector3) {
        const pivot = this.soulModel.GetPivot().Position
        return pivot.sub(position).Magnitude
    }

    targetState(dt: number) {
        if(!this.targetTo) return
        if(!this.calculatedPosition) {
            this.calculatedPosition = this.soulModel.GetPivot()
        }
        this.soulModel.SoulFragment.Value.Value = this.targetTo.item

        const position = this.targetTo.getPosition()
        const pivot = this.calculatedPosition
        const distance = this.calculatedPosition?.Position?.sub(position).Magnitude

        if(!distance) return

        const rotated = new CFrame(pivot.Position, position)
        const lookVector = rotated.LookVector
        const distanceToTravel = math.min(distance, SPEED * dt)
        const toTravel = lookVector.mul(distanceToTravel)
        const newPosition = rotated.add(toTravel).mul(halfFullRotation);
        
        this.calculatedPosition = newPosition;

        // Only update model position every UPDATE_INTERVAL seconds
        const now = tick();
        if (now - this.lastUpdateTime >= UPDATE_INTERVAL) {
            this.lastUpdateTime = now;
            this.soulModel.SetAttribute("RealPosition", this.calculatedPosition);
        }

        if(distance <= 1) {
            this.soulModel.Destroy()
            this.targetTo.inventory?.giveItem(this.giveSelf())
        }
    }

    giveSelf() {
        return new RockItem()
    }

    defaultTick(dt: number) {
        if(this.calculatedPosition) {
            this.soulModel.PivotTo(this.calculatedPosition)
            this.calculatedPosition = undefined;
        }
        const pivot = this.soulModel.GetPivot();
        this.delta += dt;
        if(this.delta >= 1) {
            this.delta = 0;
            this.oldDirection = this.nextDirection
            this.nextDirection = directional.NextUnitVector().mul(10);
        }
        const newDirection = this.oldDirection.Lerp(this.nextDirection, this.delta);
        const final = new CFrame(pivot.Position, pivot.Position.add(newDirection))
        const reallyFinal = final.add(final.LookVector.mul(-dt))

        // Only update model position every UPDATE_INTERVAL seconds
        this.soulModel.PivotTo(reallyFinal);
    }

    constructor(position: Vector3) {
        super();
        const SoulModel = Template.Clone();
        this.soulModel = SoulModel;
        SoulModel.PivotTo(new CFrame(position))
        SoulModel.Parent = Workspace
        this.oldDirection = directional.NextUnitVector().mul(10)
        this.nextDirection = directional.NextUnitVector().mul(10)
        this.delta = 0;
        
        SoulModel.Destroying.Once(() => {
            this.cleanUp();
        })
        Debris.AddItem(SoulModel, 120)
        registerCollectableItem(
            SoulModel,
            () => { return this.giveSelf() }
        )

        this.setState("defaultTick")
        Soul.registry.add(this)
        CollectionService.AddTag(SoulModel, "Soul")
    }
}