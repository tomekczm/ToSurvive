import { CollectionService, Debris, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { RockItem } from "server/Item/Rock";
import { Entity } from "./Entity";
import type { LanternItem } from "server/Item/Lantern";

const directional = new Random();

const Template = ServerStorage.Models.Soul

const SPEED = 1;

const halfFullRotation = CFrame.Angles(0, math.rad(180),0)

// this whole thing probably is really inefficient network wise but
export class Soul extends Entity {

    delta = 0;
    oldDirection: Vector3;
    nextDirection: Vector3;
    soulModel: typeof Template;

    nextUpdate: thread | undefined = undefined
    imaginaryPosition: CFrame | undefined

    targetTo: LanternItem | undefined

    public static registry = new Set<Soul>();

    distanceTo(position: Vector3) {
        const pivot = this.soulModel.GetPivot().Position
        return pivot.sub(position).Magnitude
    }


    update(treshold: number) {
        if(!this.targetTo) return
        const position = this.targetTo.getPosition()
        const pivot = this.soulModel.GetPivot()

        const distance = this.distanceTo(position)

        const rotated = new CFrame(pivot.Position, position)
        const lookVector = rotated.LookVector
        const distanceToTravel = math.min(distance, SPEED * treshold)

        const toTravel = lookVector.mul(distanceToTravel)

        const newPosition = rotated.add(toTravel).mul(halfFullRotation);

        this.soulModel.PivotTo(newPosition)

        if(distance <= 1) {
            this.soulModel.Destroy()
            this.targetTo.inventory?.giveItem(this.giveSelf())
        }
    }

    targetState(dt: number) {
        this.update(dt)
        /*
        if(!this.targetTo) return
        const position = this.targetTo.getPosition()
        const pivot = this.soulModel.GetPivot()

        const distance = this.distanceTo(position)

        const rotated = new CFrame(pivot.Position, position)
        const lookVector = rotated.LookVector
        const distanceToTravel = math.min(distance, SPEED * dt)

        const toTravel = lookVector.mul(distanceToTravel)

        const newPosition = rotated.add(toTravel).mul(halfFullRotation);

        this.soulModel.PivotTo(newPosition)

        if(distance <= 1) {
            this.soulModel.Destroy()
            this.targetTo.inventory?.giveItem(this.giveSelf())
        }
        */
       //if(this.nextUpdate) return
       //this.nextUpdate = task.delay(1, () => {
       //     this.update(1)
       //     this.nextUpdate = undefined
       //})
    }

    giveSelf() {
        return new RockItem()
    }

    defaultTick(dt: number) {
        const pivot = this.soulModel.GetPivot();
        this.delta += dt;
        if(this.delta >= 1) {
            this.delta = 0;
            this.oldDirection = this.nextDirection
            this.nextDirection = directional.NextUnitVector().mul(10);
        }
        const newDirection = this.oldDirection.Lerp(this.nextDirection, this.delta);
        const final = new CFrame(pivot.Position, pivot.Position.add(newDirection))
        const reallyFInal = final.add(final.LookVector.mul(-dt))
        this.soulModel.PivotTo(reallyFInal)
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
    }
}