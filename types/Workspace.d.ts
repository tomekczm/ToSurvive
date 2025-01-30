interface Workspace extends Model {
	Script: Script;
	PlayerBuilding: Folder;
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
	Camera: Camera;
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Props: Folder;
	slash: Sound;
	PointLight: PointLight;
	["sword slash"]: Sound;
	Ores: Folder;
	Characters: Folder;
	Snow: Folder & {
		snow_bloom: BloomEffect;
		snow_blur: BlurEffect;
		snow_sk: Sky;
		snow_cc: ColorCorrectionEffect;
	};
	NoRay: Folder & {
		Base: Part;
	};
	Item_Crystal_Logs: Decal;
}
