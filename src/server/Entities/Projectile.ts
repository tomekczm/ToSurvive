import { RunService, Workspace } from "@rbxts/services"
import { Caster, PartCache, HighFidelityBehavior, ActiveCast, CastBehavior } from "@rbxts/nextcast";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { hurtHighlight } from "server/VFX";
import { getEntity } from "./Entities";

const BULLET_MAXDIST = 1000;
const BULLET_GRAVITY = new Vector3(0, (-Workspace.Gravity * 0.01), 0);
const DEBUG = false;

interface Info {
    damage: number,
    origin: Model
}

const NextCastCaster = new Caster<Info>();

const CastParams = new RaycastParams();
CastParams.IgnoreWater = true;
CastParams.FilterType = Enum.RaycastFilterType.Exclude;
const NoRay = Workspace.WaitForChild("NoRay")
const Characters = Workspace.WaitForChild("Characters")
CastParams.FilterDescendantsInstances = [ NoRay, Characters ];
Caster.VisualizeCasts = DEBUG
//Caster.DebugLogging = DEBUG

function lengthChanged(cast: ActiveCast<{}>, lastPoint: Vector3, rayDir: Vector3, rayDisplacement: number, segmentVelocity: Vector3, object?: BasePart | undefined) {
    if(!object) return
    const bulletLength = object.Size.Z/2
    const offset = new CFrame(0, 0, -(rayDisplacement - bulletLength)).mul(CFrame.Angles(math.rad(0),math.rad(180),math.rad(0)))
	object.CFrame = CFrame.lookAt(lastPoint, lastPoint.add(rayDir)).ToWorldSpace(offset)
}

NextCastCaster.LengthChanged.Connect(lengthChanged)
NextCastCaster.RayHit.Connect(async (cast, result, b, c) => {
    if(!c) return;
    
    const origin = cast.UserData.origin
    const damage = cast.UserData.damage ?? 10

    const parent = result.Instance.Parent
    const humanoid = parent?.FindFirstChildOfClass("Humanoid")
    if(parent && humanoid) {
        humanoid.TakeDamage(damage)
        hurtHighlight(parent as Model)
        const zombie = getEntity(parent)
        if(origin)
            zombie?.attackedByPlayer(origin)
    }
    
    const constraint = new Instance("WeldConstraint")
    c.Anchored = false;
    c.CanCollide = true
    constraint.Part1 = c;
    constraint.Part0 = result.Instance;
    constraint.Parent = c;

    const { SpearItem } = await import("server/Item/Spear");
    registerCollectableItem(
        c,
        () => {
            return new SpearItem()
        }
    )
})

export class Projectile {
    constructor(model: BasePart, position: CFrame, owner: Model | undefined = undefined) {
        const behaviour: CastBehavior<Info> = {
            Acceleration: BULLET_GRAVITY,
            CosmeticBulletTemplate: model,
            CosmeticBulletContainer: NoRay,
            AutoIgnoreContainer: true,
            MaxDistance: 300,
            HighFidelityBehavior: HighFidelityBehavior.Always,
            HighFidelitySegmentSize: 0.5,
            SphereSize: 1.5,
            RaycastParams: CastParams
        };
        const fired = NextCastCaster.Fire(position.Position, position.LookVector, 100, behaviour);
        fired.UserData.damage = 10;
        fired.UserData.origin = owner;
    }
}