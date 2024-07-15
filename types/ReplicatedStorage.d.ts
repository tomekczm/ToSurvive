interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
		NumberSequence: ModuleScript;
		Ability: ModuleScript;
		HashCode: ModuleScript;
		Item: ModuleScript;
		HammerRecipes: ModuleScript;
		Bezier: ModuleScript;
		Array: ModuleScript;
		InventoryData: ModuleScript;
		AbilityManager: ModuleScript;
	};
	Events: Folder & {
		Inventory: Folder & {
			SwapSlots: RemoteEvent;
			QuantityChanged: RemoteEvent;
			SetSlot: RemoteEvent;
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
		Sword: Model & {
			RootPart: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
		Rock: Model & {
			RootPart: MeshPart & {
				PickUp: ProximityPrompt;
				Attachment: Attachment;
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
	};
	Animations: Folder & {
		Climbing: Animation;
		Idle: Animation;
		Walking: Animation;
	};
	Builds: Folder & {
		["Wooden Wall"]: Model;
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
