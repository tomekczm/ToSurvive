import { ServerStorage, Workspace } from "@rbxts/services";
import { BiomeProp } from "./BiomeProp";
import { Biome } from "./Main";
import { Ore } from "./Ores/Ore";

export abstract class GenericBiome implements Biome {
    abstract vector: Vector2;
    abstract props: BiomeProp[]
    abstract density: number;
    private random = new Random()

    ores = [
        new Ore(100, -100, 10, "Coal")
    ]

    abstract getMaterial(x: number, y: number): Enum.Material;
    
    getProp(x: number, y: number): Model | undefined {
        const num = this.random.NextInteger(0, 1000) / 1000;
        if(num >= this.density) return;

        const r = this.random.NextNumber();
        let sum = 0;
        for (const prop of this.props) {
            sum += prop.chance;
            if (r <= sum) {
                const clone = prop.getClone(this.random)
                return clone
            };
        }

        return undefined;
    }
    
}