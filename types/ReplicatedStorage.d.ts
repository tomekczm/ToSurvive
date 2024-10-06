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
		HashCode: ModuleScript;
		Item: ModuleScript;
		InventoryData: ModuleScript;
		Array: ModuleScript;
		Bezier: ModuleScript;
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
				Hit: RemoteEvent;
				Swing: RemoteEvent;
			};
			RootPart: Part & {
				Attachment: Attachment;
				Mesh: SpecialMesh;
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
		Walking: Animation;
		Axe: Folder & {
			VM_Hold: Animation;
		};
		Hammer: Folder & {
			VM_Hold: Animation;
		};
		Right: Animation;
		Left: Animation;
		Idle: Animation;
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
		Crow: Model & {
			GEO_RedtailHawk_01: MeshPart & {
				Root: Bone & {
					Body: Bone & {
						RightArm1_LoResClavical: Bone & {
							RightArm1_LoResUpperArm: Bone & {
								RightArm1_LoResLowerArm: Bone & {
									RightArm1_LoResHand: Bone;
								};
							};
						};
						RightLeg1_LoResUpperLeg: Bone & {
							RightLeg1_LoResLowerLeg: Bone & {
								RightLeg1_LoResFoot: Bone;
							};
						};
						Neck: Bone & {
							Head: Bone;
						};
						Tail: Bone;
						LeftArm1_LoResClavical: Bone & {
							LeftArm1_LoResUpperArm: Bone & {
								LeftArm1_LoResLowerArm: Bone & {
									LeftArm1_LoResHand: Bone;
								};
							};
						};
						LeftLeg1_LoResUpperLeg: Bone & {
							LeftLeg1_LoResLowerLeg: Bone & {
								LeftLeg1_LoResFoot: Bone;
							};
						};
					};
				};
				SurfaceAppearance: SurfaceAppearance;
			};
			InitialPoses: Folder & {
				GEO_RedtailHawk_01_Composited: CFrameValue;
				LeftLeg1_LoResToe_end_Composited: CFrameValue;
				Tail_Composited: CFrameValue;
				RightLeg1_LoResUpperLeg_Composited: CFrameValue;
				RightLeg1_LoResLowerLeg_Composited: CFrameValue;
				RightLeg1_LoResToe_end_Initial: CFrameValue;
				LeftLeg1_LoResToe_Composited: CFrameValue;
				LeftArm1_LoResClavical_Initial: CFrameValue;
				LeftLeg1_LoResFoot_Composited: CFrameValue;
				Neck_Initial: CFrameValue;
				RightArm1_LoResUpperArm_Composited: CFrameValue;
				RightLeg1_LoResUpperLeg_Original: CFrameValue;
				RightLeg1_LoResFoot_Original: CFrameValue;
				LeftLeg1_LoResToe_end_Initial: CFrameValue;
				Head_Initial: CFrameValue;
				LeftLeg1_LoResUpperLeg_Original: CFrameValue;
				LeftArm1_LoResClavical_Original: CFrameValue;
				LeftLeg1_LoResLowerLeg_Original: CFrameValue;
				RightLeg1_LoResToe_end_Original: CFrameValue;
				RightLeg1_LoResToe_Initial: CFrameValue;
				LeftArm1_LoResHand_Initial: CFrameValue;
				Root_Initial: CFrameValue;
				Head_Composited: CFrameValue;
				Body_Initial: CFrameValue;
				LeftArm1_LoResLowerArm_Initial: CFrameValue;
				LeftLeg1_LoResUpperLeg_Composited: CFrameValue;
				LeftLeg1_LoResFoot_Original: CFrameValue;
				LeftArm1_LoResClavical_Composited: CFrameValue;
				RightLeg1_LoResToe_end_Composited: CFrameValue;
				Root_Original: CFrameValue;
				RightArm1_LoResClavical_Original: CFrameValue;
				LeftLeg1_LoResLowerLeg_Initial: CFrameValue;
				LeftLeg1_LoResToe_Original: CFrameValue;
				Body_Original: CFrameValue;
				RightArm1_LoResUpperArm_Original: CFrameValue;
				LeftLeg1_LoResLowerLeg_Composited: CFrameValue;
				LeftLeg1_LoResFoot_Initial: CFrameValue;
				RightArm1_LoResUpperArm_Initial: CFrameValue;
				RightArm1_LoResClavical_Initial: CFrameValue;
				Body_Composited: CFrameValue;
				RightArm1_LoResHand_Initial: CFrameValue;
				Tail_Initial: CFrameValue;
				LeftArm1_LoResHand_Composited: CFrameValue;
				RightArm1_LoResLowerArm_Original: CFrameValue;
				LeftLeg1_LoResToe_end_Original: CFrameValue;
				LeftLeg1_LoResUpperLeg_Initial: CFrameValue;
				RightLeg1_LoResUpperLeg_Initial: CFrameValue;
				LeftArm1_LoResUpperArm_Initial: CFrameValue;
				Tail_Original: CFrameValue;
				Head_Original: CFrameValue;
				Neck_Original: CFrameValue;
				LeftArm1_LoResLowerArm_Original: CFrameValue;
				RightLeg1_LoResLowerLeg_Initial: CFrameValue;
				RightLeg1_LoResFoot_Initial: CFrameValue;
				RightArm1_LoResLowerArm_Initial: CFrameValue;
				GEO_RedtailHawk_01_Initial: CFrameValue;
				RightLeg1_LoResToe_Original: CFrameValue;
				LeftArm1_LoResUpperArm_Composited: CFrameValue;
				LeftArm1_LoResLowerArm_Composited: CFrameValue;
				LeftArm1_LoResUpperArm_Original: CFrameValue;
				RightLeg1_LoResToe_Composited: CFrameValue;
				RightArm1_LoResHand_Composited: CFrameValue;
				GEO_RedtailHawk_01_Original: CFrameValue;
				RightArm1_LoResLowerArm_Composited: CFrameValue;
				RightLeg1_LoResFoot_Composited: CFrameValue;
				RightLeg1_LoResLowerLeg_Original: CFrameValue;
				Neck_Composited: CFrameValue;
				RightArm1_LoResClavical_Composited: CFrameValue;
				LeftArm1_LoResHand_Original: CFrameValue;
				Root_Composited: CFrameValue;
				RightArm1_LoResHand_Original: CFrameValue;
				LeftLeg1_LoResToe_Initial: CFrameValue;
			};
			AnimationController: AnimationController & {
				Animator: Animator;
			};
		};
		SnowVFX: Part & {
			Snowfall: ParticleEmitter;
		};
		CrowFlight: Folder & {
			FlyNormal: Animation;
			FlyPatterned: Animation;
		};
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
				["raycast-hitbox"]: Folder & {
					src: ModuleScript & {
						HitboxCaster: ModuleScript;
						GoodSignal: ModuleScript;
						VisualizerCache: ModuleScript;
						Solvers: Folder & {
							Vector3: ModuleScript;
							Attachment: ModuleScript;
							LinkAttachments: ModuleScript;
							Bone: ModuleScript;
						};
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
