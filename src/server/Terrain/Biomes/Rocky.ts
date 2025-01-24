import { BiomeProp } from "../BiomeProp";
import { GenericBiome } from "../GenericBiome";
import type { Biome } from "../Main";

export class Rock extends GenericBiome {
    props = [];
    density = 0;
    getProp(x: number, y: number): Model | undefined {
        return undefined;
    }
    getMaterial(x: number, y: number): Enum.Material {
       return Enum.Material.Rock
    }
    vector = new Vector2(-1, 1);

}