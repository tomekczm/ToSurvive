import { ServerStorage } from "@rbxts/services";
import type { Biome } from "../Main";
import { sample } from "shared/Array";
import { GenericBiome } from "../GenericBiome";
import { BiomeProp } from "../BiomeProp";
import { StoneProp } from "../StoneProp";
const Props = ServerStorage.Models.Plains

export class Plains extends GenericBiome {
    props = [
        new BiomeProp(
            1/5, Props.Tree1,
        ),
        new BiomeProp(
            1/5, Props.Tree2,
        ),
        new BiomeProp(
            1/5, Props.Tree3,
        ),
        new BiomeProp(
            1/5, Props.MultiRock,
        ),
        new StoneProp(3/5)
    ];
    density = 0.01;
    getMaterial(x: number, y: number): Enum.Material {
        const showFeatures = math.noise(x * 0.001, y * 0.001) < 0

        if (math.abs(math.noise((x * 0.1) + 643, (y * 0.1) + 643)) < 0.2 && showFeatures) {
            return Enum.Material.LeafyGrass
        }
        return Enum.Material.Grass
    }
    vector = new Vector2(1, 0);

}