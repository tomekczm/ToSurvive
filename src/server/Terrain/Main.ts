import { CollectionService, Players, ServerStorage, TweenService, Workspace } from "@rbxts/services"
import { evalTerrainSequence } from "shared/NumberSequence"
import { Plains } from "./Biomes/Plains"
import { Snow } from "./Biomes/Snow"
import { Desert } from "./Biomes/Desert"
import { Rock } from "./Biomes/Rocky"
import { Muddy } from "./Biomes/Muddy"
import { Sandy2 } from "./Biomes/Sandy"
import { GenericBiome } from "./GenericBiome"

const GeneratorData = ServerStorage.WaitForChild("TerrainGeneratorData") as Folder
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export interface Biome {
    vector: Vector2
    getMaterial(x: number, y: number): Enum.Material
    getProp(x: number, y: number): Model | undefined;
}

const propHolder = Workspace.WaitForChild("Props") as Folder

const UNDER_LAYER_DEPTH = 20; // Depth for the under layer
const UNDER_LAYER_MATERIAL = Enum.Material.Rock; // Material for the under layer

const Ores = Workspace.Ores

const biomes: Biome[] = [
    new Plains(),
    new Snow(),
    new Desert(),
    new Rock(),
    new Muddy(),
    new Sandy2()
]

const CELL_SIZE = 4
const CHUNK_SIZE = 16

const SIZE_WHOLE = CELL_SIZE * CHUNK_SIZE

const tickString = math.floor(tick())
const MASTER_SEED = new Random(tickString).NextNumber(-100000, 100000)
print(`MASTER_SEED=${MASTER_SEED}`)
const VIEW_RANGE = 6

const overrides = new Map<string, Enum.Material>();

const RNG = new Random()

const chunks = new Set<string>()

export function getData(x: number, z: number) {
    x += MASTER_SEED
    z += MASTER_SEED

    let noise = math.noise(x * 0.01, z * 0.01) * 20

    x += 100
    z += 100

    const humidity = math.noise(x * 0.0001, z * 0.0001)

    //print(`Humidity math.noise(${x} * 0.0001, ${z} * 0.0001)`)

    x += 100
    z += 100

    const heat = math.noise(x * 0.001, z * 0.001)

    //print(`heat math.noise(${x} * 0.001, ${z} * 0.001)`)

    const vector = new Vector2(humidity, heat)
    //print(vector)

    //x += FEATURE_OFFSET
    //z += FEATURE_OFFSET

    let closestDistance = math.huge
    let closestBiome: Biome | undefined = undefined
    let secondBiome: Biome | undefined = undefined
    let secondDistance = math.huge

    for (const i of $range(1, biomes.size())) {
        const biome = biomes[i-1];
        const distance = (vector.sub(biome.vector)).Magnitude
        //print(`${distance} < ${closestDistance}`)
        if(distance < closestDistance) {
            if(closestBiome) {
                secondBiome = closestBiome
                secondDistance = closestDistance
            }
            closestDistance = distance
            closestBiome = biome
        }
    }
    assert(closestBiome)

    let material = closestBiome.getMaterial(x, z)

    let difference = (secondDistance - closestDistance)

    //print(difference)
    //task.wait()
    if(difference <= 0.05 && secondBiome) {
        
        let secondaryMaterial = secondBiome.getMaterial(x, z)
        difference *= 20;
        const treshold = ((math.noise(x / 10 + 2, z / 10 + 2) + 1) / 2) * difference
        if(treshold <= 0.1) {
            material = secondaryMaterial
        }
    }

    
    const cMultiplier = GeneratorData.GetAttribute("CMultiplier") as number
	const mLess = GeneratorData.GetAttribute("Mless") as NumberSequence
	const mAltitude = GeneratorData.GetAttribute("MAltitude") as number
	const cWeight = GeneratorData.GetAttribute("Continentalness") as NumberSequence
	const mMultiplier = GeneratorData.GetAttribute("MMultiplier")  as number
    const cAlltitude = GeneratorData.GetAttribute("CAlltitude") as number

    
    x += 100
    z += 100

    const noiseValue = math.noise(x * cMultiplier, z * cMultiplier)
    noise += evalTerrainSequence(cWeight, noiseValue) * cAlltitude

    x += 100
    z += 100

    noise += evalTerrainSequence(mLess, math.noise(x * mMultiplier, z * mMultiplier)) * mAltitude

    return {
        height: noise,
        material: material,
        prop: closestBiome.getProp(x + 360, z + 360),
        biome: closestBiome
    }
}

function generateChunk(origin: CFrame) {
	const posX = math.floor(origin.X / SIZE_WHOLE)
	const posZ = math.floor(origin.Z / SIZE_WHOLE)

    const key = `${posX}/${posZ}`
    if(chunks.has(key)) return
    chunks.add(key)
    for(let i of $range(1, CHUNK_SIZE)) {
        for(let j of $range(1, CHUNK_SIZE)) {
            //print(i)
            const realX = posX * SIZE_WHOLE + i * CELL_SIZE
            const realZ = posZ * SIZE_WHOLE + j * CELL_SIZE
            let {
                height,
                material,
                prop,
                biome
            } = getData(realX, realZ)

            //task.wait()
            //print(new Vector2(realX, realZ))
            let pos = new CFrame(realX, height, realZ);

            // Determine the maximum absolute distance in the x or z direction from the origin
            let maxDist = math.max(math.abs(realX), math.abs(realZ));
            

            if(maxDist <= 200) {
                pos = new CFrame(realX, 1, realZ);
                let treshold = lerp(
                    (math.noise(realX / 10 + 2, realZ / 10 + 2) + 1) / 2,
                    1,
                    (maxDist / 200)
                )
                
                if (treshold <= 0.9) {
                    material = Enum.Material.Grass;
                }
            } else if(maxDist <= 500) {
                const newHeight = lerp(1, height, (maxDist - 200)/300)
                pos = new CFrame(realX, newHeight, realZ);
            }

            if(maxDist > 200 && prop) {
                prop.PivotTo(pos.add(new Vector3(0,2.5,0)))
                prop.Parent = propHolder
            }

            if(biome instanceof GenericBiome) {
                biome.ores.forEach((ore) => {
                    const procentage = RNG.NextNumber(0, 100)
                    if(ore.procentage < procentage) return
                    const top = math.min(ore.top, pos.Y - 5)
                    const position = RNG.NextNumber(ore.low, top)
                    const attachment = new Instance("Vector3Value")
                    attachment.Value = new Vector3(pos.X, position, pos.Z)
                    attachment.Parent = Ores
                })
            }
            
            const underLayerSize = new Vector3(CELL_SIZE, UNDER_LAYER_DEPTH * 5, CELL_SIZE);
            const underLayerPos = pos.add(new Vector3(0, -(UNDER_LAYER_DEPTH * 5) / 2, 0));
            Workspace.Terrain.FillBlock(underLayerPos, underLayerSize, UNDER_LAYER_MATERIAL);

			const size = new Vector3(CELL_SIZE, 5, CELL_SIZE)
			Workspace.Terrain.FillBlock(pos, size, material)
        }
    }
}

function generateInRange(cframe: CFrame) {
    for(let i of $range(-VIEW_RANGE, VIEW_RANGE)) {
        for(let j of $range(-VIEW_RANGE, VIEW_RANGE)) {
            //print(j)
            generateChunk(new CFrame(
				cframe.X + (SIZE_WHOLE * i),
				cframe.Y,
				cframe.Z + (SIZE_WHOLE * j)
				))
        }
        task.wait()
    }
}

generateInRange(new CFrame())

task.spawn(() => {
    while(true) {
        generateInRange(Workspace.CurrentCamera!.CFrame)
        const player = Players.GetPlayers()
        player.forEach((player) => {
            const character = player.Character
            if(!character) {
                return
            }
            generateInRange(character.GetPivot())
        })
        task.wait(0)
    }
})