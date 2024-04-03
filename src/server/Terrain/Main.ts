import { Players, ServerStorage, TweenService, Workspace } from "@rbxts/services"
import { evalTerrainSequence } from "shared/NumberSequence"
import { Plains } from "./Plains"
import { Snow } from "./Snow"
import { Desert } from "./Desert"
import { Rock } from "./Rocky"
import { hashCode } from "shared/HashCode"
import { Muddy } from "./Muddy"
import { Sandy2 } from "./Sandy"

const GeneratorData = ServerStorage.WaitForChild("TerrainGeneratorData") as Folder
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export interface Biome {
    vector: Vector2
    getMaterial(x: number, y: number): Enum.Material
}

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

const MASTER_RANDOM = new Random(MASTER_SEED)
const FEATURE_OFFSET = MASTER_RANDOM.NextNumber(1, 100)

const chunks = new Set<string>()

function getData(x: number, z: number) {
    //x += MASTER_SEED
    //z += MASTER_SEED

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

    for (const i of $range(1, biomes.size())) {
        const biome = biomes[i-1];
        const distance = (vector.sub(biome.vector)).Magnitude
        //print(`${distance} < ${closestDistance}`)
        if(distance < closestDistance) {
            closestDistance = distance
            closestBiome = biome
        }
    }
    //print(closestDistance)

    assert(closestBiome)

    const material = closestBiome.getMaterial(x, z)
    
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
        material: material
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
                material
            } = getData(realX, realZ)

            let pos = new CFrame(realX, height, realZ);

            // Determine the maximum absolute distance in the x or z direction from the origin
            let maxDist = math.max(math.abs(realX), math.abs(realZ));
            
            if(maxDist <= 200) {
                pos = new CFrame(realX, 1, realZ);
                material = Enum.Material.Grass;
            } else if(maxDist <= 300) {
                // Calculate new height using linear interpolation (lerp)
                // Assuming lerp function is defined or available elsewhere in your code
                const newHeight = lerp(1, height, (maxDist - 200) / 100);
                pos = new CFrame(realX, newHeight, realZ);
            }

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

print("2")
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