interface Triangle {
    /**
     * Reference to the Vertices folder in Workspace
     */
    vertices: Folder;

    /**
     * List of vertex instances
     */
    vertexList: Instance[];

    /**
     * Template for creating wedge parts
     */
    wedgeTemplate: WedgePart;

    /**
     * Creates a new Triangle instance
     */
    new(): Triangle;

    /**
     * Creates a template WedgePart for triangle construction
     */
    createWedgeTemplate(this: Triangle): WedgePart;

    /**
     * Checks if a point lies inside a triangle defined by three vertices
     * @param point The point to check
     * @param a First vertex of the triangle
     * @param b Second vertex of the triangle
     * @param c Third vertex of the triangle
     */
    isPointInTriangle(this: Triangle, point: BasePart, a: BasePart, b: BasePart, c: BasePart): boolean;

    /**
     * Checks if three vertices form a valid triangle
     * @param a First vertex
     * @param b Second vertex
     * @param c Third vertex
     */
    isValidTriangle(this: Triangle, a: BasePart, b: BasePart, c: BasePart): boolean;

    /**
     * Draws a 3D triangle using WedgeParts
     * @param a Position of first vertex
     * @param b Position of second vertex
     * @param c Position of third vertex
     * @param parent Parent instance to place the triangle parts in
     * @returns Tuple of two WedgeParts that form the triangle
     */
    draw3dTriangle(this: Triangle, a: Vector3, b: Vector3, c: Vector3, parent: Instance): LuaTuple<[WedgePart, WedgePart]>;

    /**
     * Processes the triangulation of all vertices
     */
    triangulate(this: Triangle): void;

    /**
     * Processes a single vertex in the triangulation
     * @param index Index of the vertex in vertexList
     * @param vertex The vertex to process
     * @returns Whether the vertex was successfully processed
     */
    processVertex(this: Triangle, index: number, vertex: BasePart): boolean;

    /**
     * Sets the callback function for the triangle
     * @param callback The callback function to set
     */
    createTriangleCallback(this: Triangle, callback: (a: Vector3, b: Vector3, c: Vector3, parent: Instance) => void): void;
}

declare const Triangle: Triangle;
export = Triangle; 