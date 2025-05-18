import { ServerStorage, Workspace } from "@rbxts/services";
import { JigsawGenerator } from "../Jigsaw/JigsawGenerator";

// Load cave structure models from ServerStorage
const Underground = ServerStorage.Structures.Underground;
const cores = Underground.Core.GetChildren() as Model[];
const paths = Underground.Paths.GetChildren() as Model[];

const generator = new JigsawGenerator(cores, paths)

//generator.generateStructure(100)