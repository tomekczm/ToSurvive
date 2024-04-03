interface StarterPlayer extends Instance {
	StarterCharacter: Model & {
		Humanoid: Humanoid & {
			Animator: Animator;
		};
		Head: MeshPart & {
			Rig6Motor6D: Motor6D;
		};
		RightHand: MeshPart & {
			RigidConstraint: RigidConstraint;
			Rig3Motor6D: Motor6D;
		};
		LeftAttach: IKControl;
		IKControl: IKControl;
		ControllerManager: ControllerManager & {
			GroundController: GroundController;
			SwimController: SwimController;
			ClimbController: ClimbController;
			AirController: AirController;
		};
		LeftArm: MeshPart & {
			Rig4Motor6D: Motor6D;
		};
		Torso: MeshPart & {
			Rig5Motor6D: Motor6D;
		};
		RightLeg: MeshPart & {
			Rig1Motor6D: Motor6D;
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
		LeftLeg: MeshPart & {
			Rig2Motor6D: Motor6D;
		};
	};
	StarterPlayerScripts: StarterPlayerScripts & {
		TS: Folder & {
			main: LocalScript;
			Movement: Folder & {
				CharacterController: ModuleScript;
				Climbing: ModuleScript;
			};
			Events: Folder & {
				OnCharacterAdded: ModuleScript;
			};
			BaseExitNotification: ModuleScript;
		};
	};
	StarterCharacterScripts: StarterCharacterScripts & {
		Load: LocalScript;
	};
}
