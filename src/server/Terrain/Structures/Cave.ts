import { ServerStorage, Workspace } from "@rbxts/services";
import { StructurePiece, StructurePool, JigsawGenerator } from "./Structure";

// Load cave structure models from ServerStorage
const Underground = ServerStorage.Structures.Underground;
const cores = Underground.Core.GetChildren() as Model[];
const paths = Underground.Paths.GetChildren() as Model[];

/**
 * Creates a procedurally generated cave using the jigsaw algorithm
 * @param position The start position of the cave
 * @param maxPieces Maximum number of pieces to generate
 */
export function createCave(position: Vector3, maxPieces = 20) {
    // Create structure pieces from the core models (start pieces)
    const corePieces: StructurePiece[] = [];
    for (const coreModel of cores) {
        // Create a core piece with higher weight to ensure it's selected as a start piece
        const corePiece = new StructurePiece(coreModel, "Attachment", 5);
        corePieces.push(corePiece);
    }
    
    // Create structure pieces from the path models (connecting pieces)
    const pathPieces: StructurePiece[] = [];
    for (const pathModel of paths) {
        // Create a path piece with default connector prefix
        const pathPiece = new StructurePiece(pathModel, "Attachment", 1);
        pathPieces.push(pathPiece);
    }
    
    // Create the structure pool with all available pieces
    const cavePool = new StructurePool();
    cavePool.addPieces(corePieces);
    cavePool.addPieces(pathPieces);
    
    // Create the jigsaw generator with our pool and max pieces limit
    const generator = new JigsawGenerator(cavePool, maxPieces);
    
    // Configure terrain collision checking (we might want caves to carve into terrain)
    generator.setTerrainCollisionChecking(false);
    
    // Select a random core piece to start with
    const startPiece = corePieces[math.floor(math.random() * corePieces.size())];
    
    // Generate the cave structure
    const caveStructure = generator.generate(startPiece, position);
    
    // Group all pieces under a parent model for organization
    const caveModel = new Instance("Model");
    caveModel.Name = "ProceduralCave";
    
    for (const piece of caveStructure) {
        piece.Parent = caveModel;
    }
    
    caveModel.Parent = Workspace;
    
    return caveModel;
}

// Example: Create a cave at position (0, 500, 0)
createCave(new Vector3(0, 500, 0));