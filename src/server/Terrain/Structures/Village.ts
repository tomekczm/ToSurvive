import { ServerStorage, Workspace } from "@rbxts/services";
import { sample } from "shared/Array";
import { getData } from "../Main";
import { ConvexHull } from "@rbxts/geom/Output/Algorithms/Convex-Hull";

const village = ServerStorage.Structures.Village

const cores = village.Core.GetChildren() as Model[]
const streets = village.Paths.GetChildren() as Model[]
const walls = village.Walls.GetChildren() as Model[]
const decorations = village.WaitForChild("Decorations").GetChildren() as Model[]

const RNG = new Random();

export function createVillage(position: Vector3, depth = 2) {
    const height = Workspace.Raycast(
        position.add(new Vector3(0, 100, 0)),
        new Vector3(0, -500, 0),
        params
    );
    const cframe = new CFrame(
        position.X,
        height!.Position.Y,
        position.Z
    )
    const core = sample(cores)
    Workspace.Terrain.FillCylinder(
        cframe.sub(new Vector3(0, 50 + core.GetExtentsSize().Y/2, 0)),
        100, 50,
        Enum.Material.Ground
    )
    core.PivotTo(
        cframe
    )
    boundingBoxes.push(core);
    core.Parent = Workspace
    //createPath(core)
    extend(core, depth, village.Paths.FindFirstChild("StraightPath") as Model)
}

const params = new RaycastParams();
params.FilterType = Enum.RaycastFilterType.Include;
params.AddToFilter(Workspace.Terrain);

const boundingBoxes: Array<Model> = []

function cast(origin: Vector3) {
    return Workspace.Raycast(
        origin.add(new Vector3(0, 300, 0)),
        new Vector3(0, -500, 0),
        params
    );
}

function castBone(child: Bone) {
    const raycast = cast(child.WorldPosition)
    //task.wait()
    //print(raycast)
    if(raycast) {
        child.WorldPosition = raycast.Position.add(new Vector3(0, 0.3,0));
    }

}

function adjust(instance: Model) {
    const primaryPart = instance!.PrimaryPart
    if(!primaryPart) return
    const childern = primaryPart.GetDescendants()
    for(const child of childern) {
        if(child.IsA("Bone")) {
            //print("FOUND")
            castBone(child);
        }
    }
}

function canPlace(position: CFrame, size: Vector3, parent: Model) {
    const overlap = new OverlapParams();
    overlap.FilterType = Enum.RaycastFilterType.Include;
    const newArr: Model[] = []
    boundingBoxes.forEach((box) => {
        if(box !== parent) newArr.push(box);
    })
    /*
    const vis = new Instance("Part")
    vis.Anchored = true;
    vis.Color = new Color3(0,0.97,0.26)
    vis.Size = size.add(new Vector3(0, 10,0));
    vis.CFrame = position
    vis.Transparency = 0.5;
    vis.Parent = parent;
    vis.Name = "VISUALIZATION"
    */
    overlap.FilterDescendantsInstances = newArr;
    //print(newArr)
    return (Workspace.GetPartBoundsInBox(position, size, overlap).size() === 0)
}

function extend(previous: Model, depth: number, focedModel: Model | undefined = undefined) {
    const primaryPart = previous!.PrimaryPart
    if(!primaryPart) return
    if(depth === 1) return
    const childern = primaryPart.GetDescendants()
    

    for(const child of childern) {
        if(child.IsA("Attachment") && (child.Name === "StreetConnector" || child.Name === "Point.009")) {
            const selected = focedModel ?? sample(streets);
            const newElement = selected.Clone()
            newElement.PivotTo(child.WorldCFrame)
            const [pos, size] = selected.GetBoundingBox();
            const cantPlace = !canPlace(newElement.GetPivot(), size.mul(1), previous)
            if(cantPlace) {
                newElement.Destroy()
                return
            };
            newElement.Parent = Workspace;
            if(cantPlace) {
                newElement.Name = "FAILED TO PLACD!!"
            }
            newElement.PivotTo(child.WorldCFrame)
            boundingBoxes.push(newElement)
            adjust(newElement)
            task.spawn(() => {
                extend(newElement, depth - 1)
            })
        }
        if(child.GetAttribute("AddDecoration") && child.IsA("Attachment")) {
            if(RNG.NextInteger(0, 5) === 1) {
                const deco = sample(decorations).Clone()
                deco.PivotTo(child.WorldCFrame.mul(CFrame.Angles(0, math.rad(RNG.NextInteger(0, 360)),0)))
                deco.Parent = Workspace
            }
            //boundingBoxes.push(deco)
        }
    }
}

function toVector2(cframe: CFrame) {
    return new Vector2(cframe.X, cframe.Z)
}

const WALL_LENGTH = 13;

function createWalls() {
    const wall = sample(walls)
    const vectors: Vector2[] = []
    boundingBoxes.forEach((box) => {
        const [cframe, size] = box.GetBoundingBox();
        
        const halfSize = size.mul(0.6);
        vectors.push(toVector2(cframe.mul(new CFrame(halfSize.X, halfSize.Y, halfSize.Z))))
        vectors.push(toVector2(cframe.mul(new CFrame(halfSize.X, halfSize.Y, -halfSize.Z))))
        vectors.push(toVector2(cframe.mul(new CFrame(-halfSize.X, halfSize.Y, halfSize.Z))))
        vectors.push(toVector2(cframe.mul(new CFrame(-halfSize.X, halfSize.Y, -halfSize.Z))))
    })
    print(vectors)
    const hullPoints = ConvexHull(vectors);
    for (let i = 0; i < hullPoints.size(); i++) {
        const pointA = hullPoints[i];
        const pointB = hullPoints[(i + 1) % hullPoints.size()]; // Wrap around to the start
        const direction = pointA.sub(pointB);
        const distance = direction.Magnitude
        const requiredWalls = math.ceil(distance / WALL_LENGTH)
        // Calculate midpoint and distance for the wall part placement
        /*
        const direction = pointA.sub(pointB);

        // Create the wall part
        const wallPart = wall.Clone();
        const midpoint = pointB.add(direction.div(2));
        (wallPart.GetChildren() as Part[]).forEach((child) => {
            child.Anchored = true;
        })

        wallPart.PivotTo(new CFrame(new Vector3(midpoint.X, 10, midpoint.Y), new Vector3(pointB.X, 10, pointB.Y)))
        wallPart.Parent = Workspace; // Parent to the wall object for organization
        */
       const wall = sample(walls);

       for(let j = 0; j < requiredWalls; j++) {
        let clone = wall.Clone() 

        

        const pointAVec3 = new Vector3(pointA.X, 10, pointA.Y)
        const pointBVec3 = new Vector3(pointB.X, 10, pointB.Y)

        const lookat = new CFrame(pointAVec3, pointBVec3)
        let multiplied = lookat.add(lookat.LookVector.mul(WALL_LENGTH * j))
        
        const castedY = (cast(multiplied.Position)?.Position.Y ?? 10) - 0.1;

        multiplied = multiplied.add(new Vector3(0, -multiplied.Y, 0))
        multiplied = multiplied.add(new Vector3(0, castedY, 0))

        clone.PivotTo(multiplied)
        clone.Parent = Workspace
        clone.GetDescendants().forEach((desc) => {
            if(desc.IsA("Bone")) castBone(desc);
        })
       }
    }
}

task.delay(5, () => {
    createVillage(new Vector3(250, 100, 0), 8)
    createWalls()
})