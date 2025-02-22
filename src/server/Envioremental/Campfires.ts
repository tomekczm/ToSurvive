import { ServerStorage, CollectionService, Debris, Workspace, RunService } from "@rbxts/services";
import { getConnection } from "server/ItemAbilities/PlaceConnective";

const campfireVFX = new Map<Model, typeof VFXTeplate>();
const VFXTeplate = ServerStorage.Models.Fire 

let campfireConnection: RBXScriptConnection | undefined

type Bucket = ReplicatedStorage["Builds"]["Wooden Water Bucket"]
type Campfire = ReplicatedStorage["Builds"]["Campfire"]

function disposeVFX(campfire: Model, vfx: Model) {
    campfireVFX.delete(campfire)

    CollectionService.AddTag(vfx, "DestroyCampfireVFX")
    
    Debris.AddItem(
        vfx, 10
    )
}

const temperatureMap = new Map<Instance, number>();

function campfireDisconnect(campfire: Campfire) {

    const waterbucket = getConnection(campfire) as Bucket
    
    if(waterbucket && CollectionService.HasTag(waterbucket, "Bucket")) {
        temperatureMap.delete(waterbucket)
        const smokeEmitter = waterbucket.RootPart.ParticleEmitter
        if(smokeEmitter.Enabled) {
            smokeEmitter.Enabled = false
        }
    }

    const vfx = campfireVFX.get(campfire)
    if(!vfx) return
    disposeVFX(campfire, vfx)
}

function waterBucketOnCampfireTick(bucket: Bucket, dt: number) {
    let temperature = temperatureMap.get(bucket) ?? 0

    const bucketCapacity = bucket.GetAttribute("Capacity") as number
    const isEmpty =  bucketCapacity <= 0
    const isBoiling = temperature >= 100 && !isEmpty

    if(!isBoiling) {
        temperature = math.clamp(temperature + dt, 0, 100)
        temperatureMap.set(bucket, temperature)
    } else {
        bucket.SetAttribute("Capacity", math.max(0, bucketCapacity - (dt / 100)))
    }

    const smokeEmitter = bucket.RootPart.ParticleEmitter
    const boiling = bucket.RootPart.Boiling

    if(smokeEmitter.Enabled !== isBoiling) {
        smokeEmitter.Enabled = isBoiling
    }

    if(boiling.IsPlaying !== isBoiling) {
        if(!boiling.IsPlaying) {
            boiling.Play();
        } else {
            boiling.Stop();
        }
    }
}

function campfireTick(campfire: Campfire, dt: number) {
    const fuel = campfire.GetAttribute("Fuel") as number ?? 0
    const isBurning = fuel > 0;

    const vfx = campfireVFX.get(campfire)
    const waterbucket = getConnection(campfire)
    
    if(waterbucket && CollectionService.HasTag(waterbucket, "Bucket")) {
        const multiplier = isBurning ? 1 : -1
        waterBucketOnCampfireTick(waterbucket as Bucket, dt * 100 * multiplier);
    }

    if(isBurning && !vfx) {
        const effect = VFXTeplate.Clone();
        effect.PivotTo(campfire.GetPivot())
        effect.Burnoff.FireSound.Play()
        effect.Parent = Workspace
        campfireVFX.set(campfire, effect)
    }

    if(!isBurning && vfx) {
        disposeVFX(campfire, vfx)
    }

    if(isBurning) {
        const newFuel = math.max(0, fuel - dt)
        campfire.SetAttribute("Fuel", newFuel)
    }
}

export function startCampfires() {
    campfireConnection = 
    RunService.Heartbeat.Connect((dt) => {
        const campfires = CollectionService.GetTagged("Campfire") as Campfire[]
        for(const campfire of campfires) {
            if(campfire.Parent !== Workspace) continue;
            campfireTick(campfire, dt / 10)
        }
    })
}

export function stopCampfires() {
    campfireConnection?.Disconnect()
    const campfires = CollectionService.GetTagged("Campfire") as Campfire[]
    for(const campfire of campfires) {
        if(campfire.Parent !== Workspace) continue;
        campfireDisconnect(campfire)
    }
}