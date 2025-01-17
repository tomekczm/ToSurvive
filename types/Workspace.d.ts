interface Workspace extends Model {
	Script: Script;
	Ores: Folder;
	Flag: Model & {
		Union: UnionOperation;
		Part1: Part & {
			Mesh: BlockMesh;
			Attachment: Attachment;
		};
		Flag: Beam;
		ProximityPrompt: ProximityPrompt;
		Part2: Part & {
			Mesh: BlockMesh;
			Attachment: Attachment;
		};
	};
	Characters: Folder;
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Props: Folder;
	slash: Sound;
	Camera: Camera;
	["sword slash"]: Sound;
	Model: Model;
	Snow: Folder & {
		snow_bloom: BloomEffect;
		snow_blur: BlurEffect;
		snow_sk: Sky;
		snow_cc: ColorCorrectionEffect;
	};
	VectorForce: VectorForce;
	NoRay: Folder & {
		Base: Part;
	};
	Item_Crystal_Logs: Decal;
}
