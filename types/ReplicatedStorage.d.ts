interface ReplicatedStorage extends Instance {
	Viewmodel: Model & {
		AnimationController: AnimationController & {
			Animator: Animator;
		};
		LeftArm: MeshPart & {
			Rig4Motor6D: Motor6D;
		};
		RightHand: MeshPart & {
			Rig3Motor6D: Motor6D;
			RigidConstraint: RigidConstraint;
		};
		HumanoidRootPart: Part & {
			ClimbSensor: ControllerPartSensor;
			BuoyancySensor: BuoyancySensor;
			GroundSensor: ControllerPartSensor;
			["mixamorig:Hips"]: Bone & {
				["mixamorig:LeftUpLeg"]: Bone & {
					["mixamorig:LeftLeg"]: Bone & {
						["mixamorig:LeftFoot"]: Bone & {
							["mixamorig:LeftToeBase"]: Bone;
						};
					};
				};
				["mixamorig:RightUpLeg"]: Bone & {
					["mixamorig:RightLeg"]: Bone & {
						["mixamorig:RightFoot"]: Bone & {
							["mixamorig:RightToeBase"]: Bone;
						};
					};
				};
				["mixamorig:Spine"]: Bone & {
					["mixamorig:Spine1"]: Bone & {
						["mixamorig:Spine2"]: Bone & {
							["mixamorig:RightShoulder"]: Bone & {
								["mixamorig:RightArm"]: Bone & {
									["mixamorig:RightForeArm"]: Bone & {
										["mixamorig:RightHand"]: Bone & {
											RightAttachBone: Bone;
										};
									};
								};
							};
							["mixamorig:Neck"]: Bone & {
								["mixamorig:Head"]: Bone;
							};
							["mixamorig:LeftShoulder"]: Bone & {
								["mixamorig:LeftArm"]: Bone & {
									["mixamorig:LeftForeArm"]: Bone & {
										["mixamorig:LeftHand"]: Bone & {
											LeftAttachBone: Bone;
										};
									};
								};
							};
						};
					};
				};
			};
		};
		AnimSaves: ObjectValue;
	};
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
		WalkBackwards: Animation;
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
