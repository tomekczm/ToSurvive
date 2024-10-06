import { CollectionService, RunService, Workspace } from "@rbxts/services";

Workspace.SetAttribute("Weather", "None")
let connection

type Bucket = ReplicatedStorage["Builds"]["Wooden Water Bucket"]

function bucketUpdated(bucket: Bucket) {
    const maxCapacity = bucket.GetAttribute("MaxCapacity") as number ?? 5
    const currentCapacity = bucket.GetAttribute("Capacity") as number ?? 0
    const roundedUpCapacity = tostring(math.floor(currentCapacity * 10) / 10)
    const procentage = tostring(math.floor((currentCapacity / maxCapacity) * 1000) / 10)
    bucket.RootPart.PickUp.ObjectText = `${roundedUpCapacity}/${maxCapacity}L (${procentage}%)`
}

function bucketFound(bucket: Bucket) {
    bucketUpdated(bucket)
    bucket.GetAttributeChangedSignal("Capacity").Connect(() => {
        bucketUpdated(bucket)
    })
}

for(const bucket of CollectionService.GetTagged("Bucket")) {
    bucketFound(bucket as Bucket)
}

CollectionService.GetInstanceAddedSignal("Bucket").Connect((bucket) => {
    bucketFound(bucket as Bucket)
})

task.spawn(() => {
    while(true) {
        task.wait(math.random(20, 30))
        Workspace.SetAttribute("Weather", "Rain")

        connection = RunService.Heartbeat.Connect((dt) => {
            dt = dt / 10
            const buckets = CollectionService.GetTagged("Bucket") as Bucket[]
            for(const bucket of buckets) {
                if(bucket.Parent !== Workspace) continue;
                const maxCapacity = bucket.GetAttribute("MaxCapacity") as number ?? 5
                const currentCapacity = bucket.GetAttribute("Capacity") as number ?? 0
                const newValue = math.min(maxCapacity, currentCapacity + dt)
                bucket.SetAttribute(
                    "Capacity",
                    newValue
                )
            }
        })

        task.wait(math.random(10, 20))
        Workspace.SetAttribute("Weather", "None")

        connection.Disconnect()
    }
})