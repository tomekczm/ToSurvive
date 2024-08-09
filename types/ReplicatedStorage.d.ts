interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
		NumberSequence: ModuleScript;
		Ability: ModuleScript;
		Recipes: Folder & {
			Recipe: ModuleScript;
			HammerRecipes: ModuleScript;
		};
		InventoryData: ModuleScript;
		Item: ModuleScript;
		Bezier: ModuleScript;
		Array: ModuleScript;
		HashCode: ModuleScript;
		AbilityManager: ModuleScript;
	};
	Events: Folder & {
		Inventory: Folder & {
			SwapSlots: RemoteEvent;
			SetSlot: RemoteEvent;
			QuantityChanged: RemoteEvent;
			ForceUnequipMainSlot: RemoteEvent;
			EquipSlot: RemoteFunction;
		};
		CamShake: RemoteEvent;
		CreateItem: RemoteEvent;
		Building: Folder & {
			RecieveSerialized: RemoteEvent;
		};
	};
	Tools: Folder & {
		Hammer: Model & {
			RootPart: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment;
			};
			Events: Folder & {
				Build: RemoteEvent;
			};
		};
		["Wooden Water Bucket"]: Model & {
			Events: Folder & {
				Build: RemoteEvent;
			};
			RootPart: MeshPart & {
				Attachment: Attachment;
			};
		};
		Axe: Model & {
			RootPart: Part & {
				AlternativeHan2d: Attachment;
				Attachment: Attachment;
				Mesh: SpecialMesh;
				HitPoint: Attachment & {
					Sound: Sound & {
						Modifier: PitchShiftSoundEffect;
					};
				};
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
		Sword: Model & {
			SurfaceAppearance: SurfaceAppearance;
			Events: Folder & {
				Swing: RemoteEvent;
			};
			RootPart: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment;
			};
		};
		Rock: Model & {
			RootPart: MeshPart & {
				HitPoint: Attachment & {
					Sound: Sound & {
						Modifier: PitchShiftSoundEffect;
					};
				};
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
		Flint: Model & {
			RootPart: MeshPart & {
				HitPoint: Attachment & {
					Sound: Sound & {
						Modifier: PitchShiftSoundEffect;
					};
				};
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
	};
	Animations: Folder & {
		Climbing: Animation;
		Idle: Animation;
		Walking: Animation;
	};
	Builds: Folder & {
		["Wooden Wall"]: Model;
		["Wooden Water Bucket"]: Model & {
			RootPart: MeshPart & {
				WashRock: ProximityPrompt;
				PickUp: ProximityPrompt;
			};
		};
	};
	Prefabs: Folder & {
		Slot: ImageLabel & {
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
			Quantity: TextLabel;
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				["camera-shaker"]: Folder & {
					CameraShaker: ModuleScript & {
						CameraShakeInstance: ModuleScript;
						CameraShakePresets: ModuleScript;
					};
				};
				["behavior-tree-5"]: ModuleScript & {
					BehaviorTreeCreator: ModuleScript;
					BehaviorTree3: ModuleScript;
				};
				services: ModuleScript;
				beacon: Folder & {
					out: ModuleScript;
				};
				rain: Folder & {
					src: ModuleScript;
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
			};
		};
	};
}
