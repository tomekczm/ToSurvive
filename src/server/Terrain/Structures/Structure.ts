import { Workspace } from "@rbxts/services";

// Represents a connection point (jigsaw connector)
interface JigsawConnector {
    id: string;         // Unique identifier for the connector type
    attachment: Attachment; // Reference to the attachment in the model
    isOutgoing: boolean; // True if this connector starts a connection
}

// Represents a building piece that can be used in jigsaw structures
class StructurePiece {
    readonly model: Model;
    readonly connectors: JigsawConnector[];
    readonly weight: number; // Probability weight for selection

    constructor(model: Model, connectorPrefix = "Connector_", weight = 1) {
        this.model = model;
        this.weight = weight;
        this.connectors = this.findConnectorsInModel(model, connectorPrefix);
    }

    // Find all attachments in the model that serve as connectors
    private findConnectorsInModel(model: Model, connectorPrefix: string): JigsawConnector[] {
        const connectors: JigsawConnector[] = [];
        
        // Find all attachments in the model
        const descendants = model.GetDescendants();
        for (const descendant of descendants) {
            if (descendant.IsA("Attachment")) {
                const attachment = descendant as Attachment;
                const name = attachment.Name;
                
                // Check if this attachment is a connector (follows naming convention)
                if (name.sub(1, connectorPrefix.size()) === connectorPrefix) {
                    // Parse connector data from the name
                    // Format: Connector_[ID]_[Outgoing/Incoming]
                    const parts = name.split("_");
                    if (parts.size() >= 3) {
                        const id = parts[1];
                        const isOutgoing = parts[2].lower() === "outgoing";
                        
                        connectors.push({
                            id,
                            attachment,
                            isOutgoing
                        });
                    }
                }
            }
        }
        
        return connectors;
    }

    // Clone the piece model and position it in the world
    place(position: Vector3, rotation: number): Model {
        const clone = this.model.Clone() as Model;
        clone.Parent = Workspace;
        
        // Apply rotation
        const cframe = new CFrame(position).mul(CFrame.Angles(0, math.rad(rotation), 0));
        clone.PivotTo(cframe);
        
        return clone;
    }

    // Get the world position and orientation of a connector after placement
    getConnectorWorldTransform(connectorIndex: number, position: Vector3, rotation: number): { position: Vector3, orientation: number } {
        const connector = this.connectors[connectorIndex];
        const attachment = connector.attachment;
        
        // Calculate the world CFrame of the attachment
        const modelCFrame = new CFrame(position).mul(CFrame.Angles(0, math.rad(rotation), 0));
        const partCFrame = attachment.Parent?.IsA("BasePart") ? 
            (attachment.Parent as BasePart).CFrame : new CFrame();
        
        // Get attachment's local CFrame relative to its parent
        const localCFrame = new CFrame(
            attachment.Position,
            attachment.Position.add(attachment.Axis)
        );
        
        // Calculate world CFrame of the attachment
        const worldCFrame = modelCFrame.mul(partCFrame).mul(localCFrame);
        
        // Get orientation in degrees - we'll use the Y axis rotation
        const [_, y, __] = worldCFrame.ToEulerAnglesYXZ();
        const orientationDegrees = math.deg(y) % 360;
        
        return {
            position: worldCFrame.Position,
            orientation: orientationDegrees
        };
    }
}

// Pool of available structure pieces
class StructurePool {
    private pieces: StructurePiece[] = [];
    private totalWeight = 0;
    
    constructor(pieces: StructurePiece[] = []) {
        this.addPieces(pieces);
    }
    
    addPiece(piece: StructurePiece): void {
        this.pieces.push(piece);
        this.totalWeight += piece.weight;
    }
    
    addPieces(pieces: StructurePiece[]): void {
        for (const piece of pieces) {
            this.addPiece(piece);
        }
    }
    
    // Get a random piece based on weights
    getRandomPiece(): StructurePiece | undefined {
        if (this.pieces.size() === 0) return undefined;
        
        const targetWeight = math.random() * this.totalWeight;
        let currentWeight = 0;
        
        for (const piece of this.pieces) {
            currentWeight += piece.weight;
            if (currentWeight >= targetWeight) {
                return piece;
            }
        }
        
        return this.pieces[0]; // Fallback
    }
    
    // Get pieces that have a matching connector type
    getPiecesWithConnector(connectorId: string, isOutgoing: boolean): StructurePiece[] {
        return this.pieces.filter(piece => 
            piece.connectors.some(conn => conn.id === connectorId && conn.isOutgoing === isOutgoing)
        );
    }
}

// Manages the generation of jigsaw structures
class JigsawGenerator {
    private structurePool: StructurePool;
    private maxPieces: number;
    private placedPieces: Model[] = [];
    private pendingConnections: Array<{
        position: Vector3,
        connectorId: string,
        orientation: number
    }> = [];
    
    constructor(structurePool: StructurePool, maxPieces = 50) {
        this.structurePool = structurePool;
        this.maxPieces = maxPieces;
    }
    
    // Start generation with a specific starting piece
    generate(startPiece: StructurePiece, startPosition: Vector3, startRotation = 0): Model[] {
        this.placedPieces = [];
        this.pendingConnections = [];
        
        // Place the starting piece
        const startModel = startPiece.place(startPosition, startRotation);
        this.placedPieces.push(startModel);
        
        // Add all outgoing connectors from the start piece to the pending list
        for (let i = 0; i < startPiece.connectors.size(); i++) {
            const connector = startPiece.connectors[i];
            if (connector.isOutgoing) {
                const transform = startPiece.getConnectorWorldTransform(i, startPosition, startRotation);
                
                this.pendingConnections.push({
                    position: transform.position,
                    connectorId: connector.id,
                    orientation: transform.orientation
                });
            }
        }
        
        // Process connections until we reach max pieces or run out of connections
        while (this.pendingConnections.size() > 0 && this.placedPieces.size() < this.maxPieces) {
            // Pick a random pending connection
            const connectionIndex = math.floor(math.random() * this.pendingConnections.size());
            const connection = this.pendingConnections[connectionIndex];
            
            // Remove it from the list
            this.pendingConnections.remove(connectionIndex);
            
            // Find pieces that have a matching connector type
            const matchingPieces = this.structurePool.getPiecesWithConnector(connection.connectorId, false);
            
            if (matchingPieces.size() > 0) {
                // Pick a random matching piece
                const randomIndex = math.floor(math.random() * matchingPieces.size());
                const piece = matchingPieces[randomIndex];
                
                // Find the matching connector on the piece
                for (let i = 0; i < piece.connectors.size(); i++) {
                    const pieceConnector = piece.connectors[i];
                    
                    if (pieceConnector.id === connection.connectorId && !pieceConnector.isOutgoing) {
                        // Get the transform of the incoming connector
                        const incomingTransform = piece.getConnectorWorldTransform(i, new Vector3(0, 0, 0), 0);
                        
                        // Calculate rotation needed to align connectors (180° flip to connect properly)
                        const pieceRotation = (connection.orientation - incomingTransform.orientation + 180) % 360;
                        
                        // Calculate position by placing the incoming connector at the outgoing connector position
                        // and then offset the model accordingly
                        const testTransform = piece.getConnectorWorldTransform(i, new Vector3(0, 0, 0), pieceRotation);
                        const offset = connection.position.sub(testTransform.position);
                        const piecePosition = offset;
                        
                        // Check for collision before placing
                        if (!this.wouldCollide(piece, piecePosition, pieceRotation)) {
                            // Place the piece
                            const pieceModel = piece.place(piecePosition, pieceRotation);
                            this.placedPieces.push(pieceModel);
                            
                            // Add its outgoing connectors to the pending list
                            for (let j = 0; j < piece.connectors.size(); j++) {
                                const newConnector = piece.connectors[j];
                                if (newConnector.isOutgoing) {
                                    const worldTransform = piece.getConnectorWorldTransform(j, piecePosition, pieceRotation);
                                    
                                    this.pendingConnections.push({
                                        position: worldTransform.position,
                                        connectorId: newConnector.id,
                                        orientation: worldTransform.orientation
                                    });
                                }
                            }
                        }
                        
                        break;
                    }
                }
            }
        }
        
        return this.placedPieces;
    }
    
    // Collision check using the existing implementation
    private wouldCollide(piece: StructurePiece, position: Vector3, rotation: number): boolean {
        // 1. Get the bounding box of the piece's model
        const bounds = piece.model.GetBoundingBox();
        const size = (bounds[1] as unknown as Vector3).sub(bounds[0] as unknown as Vector3);
        
        // 2. Apply rotation to the bounding box dimensions
        const angle = math.rad(rotation);
        const cosAngle = math.cos(angle);
        const sinAngle = math.sin(angle);
        
        // The width and depth need to be adjusted for rotation
        const rotatedWidth = math.abs(size.X * cosAngle) + math.abs(size.Z * sinAngle);
        const rotatedDepth = math.abs(size.X * sinAngle) + math.abs(size.Z * cosAngle);
        const rotatedSize = new Vector3(rotatedWidth, size.Y, rotatedDepth);
        
        // 3. Create a Region3 for the new piece at its intended position
        const min = position.sub(rotatedSize.div(2));
        const max = position.add(rotatedSize.div(2));
        const region = new Region3(min, max);
        
        // 4. Check for parts in this region
        const partsInRegion = Workspace.FindPartsInRegion3(region, undefined, 100);
        
        // 5. Check if any of those parts belong to our already placed pieces
        for (const part of partsInRegion) {
            const model = part.FindFirstAncestorOfClass("Model");
            if (model && this.placedPieces.includes(model)) {
                return true; // Collision detected
            }
        }
        
        return false; // No collision
    }
    
    // Property to toggle terrain collision checking
    private checkTerrainCollision = true;
    
    // Method to configure terrain collision checking
    setTerrainCollisionChecking(enabled: boolean): void {
        this.checkTerrainCollision = enabled;
    }
}

export { StructurePiece, StructurePool, JigsawGenerator, JigsawConnector };
