import { ServerStorage, Workspace } from "@rbxts/services";
import { sample } from "shared/Array";
import { getData } from "../Main";
import { ConvexHull } from "@rbxts/geom/Output/Algorithms/Convex-Hull";

const village = ServerStorage.Structures.Village

/*
const cores = village.Core.GetChildren() as Model[]
const streets = village.Paths.GetChildren() as Model[]
const walls = village.Walls.GetChildren() as Model[]
const decorations = village.WaitForChild("Decorations").GetChildren() as Model[]
*/

interface StructureInfo {
    cores: Model[],
    parts: Model[],
    walls?: Model[],
    decorations?: Model[]
    startingExtension?: Model,
    extensionNames: string[],
    decorationNames: string[],
    canFly: boolean
}

export class Structure {
    private boundingBoxes: Array<Model> = [];
    private params: RaycastParams;
    private RNG: Random;
    private structureInfo: StructureInfo;
    private readonly WALL_LENGTH = 13;

    constructor(structureInfo: StructureInfo) {
        this.structureInfo = structureInfo;
        this.RNG = new Random();
        this.params = new RaycastParams();
        this.params.FilterType = Enum.RaycastFilterType.Include;
        this.params.AddToFilter(Workspace.Terrain);
    }

    public createStructure(position: Vector3, depth = 2) {
        let cframe
        if(this.structureInfo.canFly) {
            cframe = new CFrame(position)
        } else {
            const height = this.cast(position.add(new Vector3(0, 100, 0)));
            cframe = new CFrame(
                position.X,
                height!.Position.Y,
                position.Z
            )
        }
        const core = this.RNG.Sample(this.structureInfo.cores)
        /*
        Workspace.Terrain.FillCylinder(
            cframe.sub(new Vector3(0, 50 + core.GetExtentsSize().Y/2, 0)),
            100, 50,
            Enum.Material.Ground
        )
            */
        core.PivotTo(
            cframe
        )
        this.boundingBoxes.push(core);
        core.Parent = Workspace
        //createPath(core)
        const extension = this.structureInfo.startingExtension ? this.structureInfo.startingExtension : this.RNG.Sample(this.structureInfo.parts)
        this.extend(core, depth, extension)
    }

    private cast(origin: Vector3) {
        return Workspace.Raycast(
            origin.add(new Vector3(0, 300, 0)),
            new Vector3(0, -500, 0),
            this.params
        );
    }

    private castBone(child: Bone) {
        const raycast = this.cast(child.WorldPosition)
        //task.wait()
        //print(raycast)
        if(raycast) {
            child.WorldPosition = raycast.Position.add(new Vector3(0, 0.3,0));
        }

    }

    private adjust(instance: Model) {
        const primaryPart = instance!.PrimaryPart
        if(!primaryPart) return
        const childern = primaryPart.GetDescendants()
        for(const child of childern) {
            if(child.IsA("Bone")) {
                //print("FOUND")
                this.castBone(child);
            }
        }
    }

    private canPlace(position: CFrame, size: Vector3, parent: Model) {
        const overlap = new OverlapParams();
        overlap.FilterType = Enum.RaycastFilterType.Include;
        const newArr: Model[] = []
        this.boundingBoxes.forEach((box) => {
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
        return (Workspace.GetPartBoundsInBox(position, size.mul(1.1), overlap).size() === 0)
    }

    private extend(previous: Model, depth: number, focedModel: Model | undefined = undefined) {
        const primaryPart = previous!.PrimaryPart
        if(!primaryPart) return
        if(depth === 1) return
        const childern = primaryPart.GetDescendants()
        

        for(const child of childern) {
            if(child.IsA("Attachment") && (this.structureInfo.extensionNames.includes(child.Name))) {
                print(child.GetFullName())
                const selected = focedModel ?? this.RNG.Sample(this.structureInfo.parts);
                const newElement = selected.Clone()
                newElement.PivotTo(child.WorldCFrame)
                const [pos, size] = selected.GetBoundingBox();
                const primaryPart = newElement.PrimaryPart
                if (!primaryPart) {
                    newElement.Destroy()
                    return
                }
                const cantPlace = !this.canPlace(pos, size, previous)
                newElement.Parent = Workspace;
                if(cantPlace) {
                    newElement.Destroy()
                    return
                };
                newElement.PivotTo(child.WorldCFrame)
                this.boundingBoxes.push(newElement)
                this.adjust(newElement)
                task.spawn(() => {
                    this.extend(newElement as Model, depth - 1)
                })
            }
            if(child.GetAttribute("AddDecoration") && child.IsA("Attachment") && this.structureInfo.decorations) {
                if(this.RNG.NextInteger(0, 5) === 1) {
                    const deco = this.RNG.Sample(this.structureInfo.decorations).Clone()
                    deco.PivotTo(child.WorldCFrame.mul(CFrame.Angles(0, math.rad(this.RNG.NextInteger(0, 360)),0)))
                    deco.Parent = Workspace
                }
                //boundingBoxes.push(deco)
            }
        }
    }

    private toVector2(cframe: CFrame) {
        return new Vector2(cframe.X, cframe.Z)
    }

    public createWalls() {
        const walls = this.structureInfo.walls
        if(!walls) return
        const vectors: Vector2[] = []
        this.boundingBoxes.forEach((box) => {
            const [cframe, size] = box.GetBoundingBox();
            
            const halfSize = size.mul(0.6);
            vectors.push(this.toVector2(cframe.mul(new CFrame(halfSize.X, halfSize.Y, halfSize.Z))))
            vectors.push(this.toVector2(cframe.mul(new CFrame(halfSize.X, halfSize.Y, -halfSize.Z))))
            vectors.push(this.toVector2(cframe.mul(new CFrame(-halfSize.X, halfSize.Y, halfSize.Z))))
            vectors.push(this.toVector2(cframe.mul(new CFrame(-halfSize.X, halfSize.Y, -halfSize.Z))))
        })
        print(vectors)
        const hullPoints = ConvexHull(vectors);
        for (let i = 0; i < hullPoints.size(); i++) {
            const pointA = hullPoints[i];
            const pointB = hullPoints[(i + 1) % hullPoints.size()]; // Wrap around to the start
            const direction = pointA.sub(pointB);
            const distance = direction.Magnitude
            const requiredWalls = math.ceil(distance / this.WALL_LENGTH)
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
           const wall = this.RNG.Sample(walls);

           for(let j = 0; j < requiredWalls; j++) {
            let clone = wall.Clone() 

            

            const pointAVec3 = new Vector3(pointA.X, 10, pointA.Y)
            const pointBVec3 = new Vector3(pointB.X, 10, pointB.Y)

            const lookat = new CFrame(pointAVec3, pointBVec3)
            let multiplied = lookat.add(lookat.LookVector.mul(this.WALL_LENGTH * j))
            
            const castedY = (this.cast(multiplied.Position)?.Position.Y ?? 10) - 0.1;

            multiplied = multiplied.add(new Vector3(0, -multiplied.Y, 0))
            multiplied = multiplied.add(new Vector3(0, castedY, 0))

            clone.PivotTo(multiplied)
            clone.Parent = Workspace
            clone.GetDescendants().forEach((desc) => {
                if(desc.IsA("Bone")) this.castBone(desc);
            })
           }
        }
    }
}

task.delay(5, () => {
    //createVillage(new Vector3(250, 100, 0), 8)
    //createWalls()
})