interface ServerStorage extends Instance {
	Models: Folder & {
		Plains: Folder & {
			Tree3: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			Tree1: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			Tree2: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			MultiRock: Model;
		};
		Desert: Folder & {
			SandRock: Model;
		};
		ZombieModel: Model & {
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
			AnimSaves: ObjectValue;
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
		IceBiome: Folder & {
			Tree1: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			Tree2: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			MultiRock: Model;
		};
	};
	Animations: Folder & {
		Zombie: Folder & {
			Idle: Animation;
			Kick: Folder & {
				Kick2: Animation;
				Kick1: Animation;
			};
			Punch: Folder & {
				Punch1: Animation;
				Punch2: Animation;
			};
			StandUp: Animation;
			Walk: Animation;
		};
		Sword: Folder & {
			Hold: Animation;
			Swing: Animation;
		};
	};
	Tools: Folder & {
		Sword: Model & {
			RootPart: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
	};
	RBX_ANIMSAVES: Model & {
		ZombieModel: ObjectValue & {
			["Imported Animation Clip"]: KeyframeSequence & {
				End: Keyframe & {
					HumanoidRootPart: Pose & {
						["mixamorig:Hips"]: Pose & {
							["mixamorig:Spine"]: Pose & {
								["mixamorig:Spine1"]: Pose & {
									["mixamorig:Spine2"]: Pose & {
										["mixamorig:RightShoulder"]: Pose & {
											["mixamorig:RightArm"]: Pose & {
												["mixamorig:RightForeArm"]: Pose;
											};
										};
										["mixamorig:Neck"]: Pose & {
											["mixamorig:Head"]: Pose;
										};
										["mixamorig:LeftShoulder"]: Pose & {
											["mixamorig:LeftArm"]: Pose & {
												["mixamorig:LeftForeArm"]: Pose;
											};
										};
									};
								};
							};
							["mixamorig:LeftUpLeg"]: Pose & {
								["mixamorig:LeftLeg"]: Pose & {
									["mixamorig:LeftFoot"]: Pose & {
										["mixamorig:LeftToeBase"]: Pose;
									};
								};
							};
							["mixamorig:RightUpLeg"]: Pose & {
								["mixamorig:RightLeg"]: Pose & {
									["mixamorig:RightFoot"]: Pose & {
										["mixamorig:RightToeBase"]: Pose;
									};
								};
							};
						};
					};
					RootNode: Pose;
				};
			};
		};
	};
	TerrainGeneratorData: Folder;
}
