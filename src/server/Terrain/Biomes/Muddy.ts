import { BiomeProp } from "../BiomeProp";
import { GenericBiome } from "../GenericBiome";
import { Biome } from "../Main";
import { Ore } from "../Ores/Ore";

export class Muddy extends GenericBiome {
    props = [];
    density = 0;
    getProp(x: number, y: number): Model | undefined {
        return undefined;
    }
    getMaterial(x: number, y: number): Enum.Material {
        const showFeatures = math.noise(x * 0.001 + 863, y * 0.001 + 863) < 0

        if (math.abs(math.noise((x * 0.1) + 643, (y * 0.1) + 643)) < 0.2 && showFeatures) {
            return Enum.Material.CrackedLava
        }
        return Enum.Material.Mud
    }
    vector = new Vector2(0.5, 0.8);
}