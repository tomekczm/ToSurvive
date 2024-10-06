interface StarterPlayer extends Instance {
	StarterCharacter: Model & {
		Humanoid: Humanoid & {
			Animator: Animator;
		};
		TorsoAttach: IKControl;
		Head: MeshPart & {
			Rig6Motor6D: Motor6D;
		};
		RightHand: MeshPart & {
			RigidConstraint: RigidConstraint;
			Rig3Motor6D: Motor6D;
		};
		LeftAttach: IKControl;
		IKControlLeftLeg: IKControl;
		IKControlRightLeg: IKControl;
		RightLeg: MeshPart & {
			Rig1Motor6D: Motor6D;
		};
		LeftArm: MeshPart & {
			Rig4Motor6D: Motor6D;
		};
		Torso: MeshPart & {
			Rig5Motor6D: Motor6D;
		};
		RightAttach: IKControl;
		HumanoidRootPart: Part & {
			IKTarget1: Attachment;
			GroundSensor: ControllerPartSensor;
			ClimbSensor: ControllerPartSensor;
			BuoyancySensor: BuoyancySensor;
			IKTarget2: Attachment;
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
		LeftLeg: MeshPart & {
			Rig2Motor6D: Motor6D;
		};
	};
	StarterPlayerScripts: StarterPlayerScripts & {
		TS: Folder & {
			Inventory: Folder & {
				Inventory: ModuleScript;
			};
			CamShake: ModuleScript;
			Item: Folder & {
				Hammer: ModuleScript;
				Rock: ModuleScript;
				WaterBucket: ModuleScript;
				Flint: ModuleScript;
				AxeItem: ModuleScript;
				Sword: ModuleScript;
				ItemRegistrar: ModuleScript;
				ClientItem: ModuleScript;
			};
			ItemAbility: Folder & {
				Viewmodel: ModuleScript;
				PointAtAbility: ModuleScript;
				MeleeSwing: ModuleScript;
				SelfBuildAbility: ModuleScript;
				SwingAbility: ModuleScript;
				RotateAbility: ModuleScript;
				CraftAndBuildAbility: ModuleScript;
				BuildAbility: ModuleScript;
			};
			SpinningItems: ModuleScript;
			main: LocalScript;
			Movement: Folder & {
				CharacterController: ModuleScript;
				Climbing: ModuleScript;
			};
			Events: Folder & {
				OnCharacterAdded: ModuleScript;
			};
			Notifications: ModuleScript;
			Weather: Folder & {
				WindShake: Folder & {
					WindShake: ModuleScript;
					Settings: ModuleScript;
					VectorMap: ModuleScript;
				};
				Wind: ModuleScript;
			};
			VFX: Folder & {
				LowHealth: ModuleScript;
				Ragdoll: ModuleScript;
				Walking: ModuleScript;
				HurtHighlight: ModuleScript;
				Crows: ModuleScript;
			};
			FirstPersonMode: ModuleScript;
		};
	};
	ControllerManager: ControllerManager & {
		GroundController: GroundController;
		SwimController: SwimController;
		ClimbController: ClimbController;
		AirController: AirController;
	};
	StarterCharacterScripts: StarterCharacterScripts & {
		Load: LocalScript;
	};
}
