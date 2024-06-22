import { ServerStorage } from "@rbxts/services";
import { BiomeProp } from "../BiomeProp";
import { GenericBiome } from "../GenericBiome";
import type { Biome } from "../Main";

const Props = ServerStorage.Models.Desert

export class Sandy2 extends GenericBiome {
    density = 0.001;
    props = [
        new BiomeProp(1, Props.SandRock)
    ];
    getMaterial(x: number, y: number): Enum.Material {
        return Enum.Material.Sand
    }
    vector = new Vector2(0, 1);
}