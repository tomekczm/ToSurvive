interface ServerStorage extends Instance {
	TerrainGeneratorData: Folder;
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
		["Wooden Log"]: Model & {
			WoodenLog: Part & {
				PickUp: ProximityPrompt;
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
		Soul: Model & {
			SoulFragment: Part & {
				ParticleEmitter: ParticleEmitter;
			};
		};
		Flowers: Model & {
			Top: MeshPart & {
				CanColor: BoolValue;
			};
			["Cube.090"]: MeshPart;
			["Cylinder.023"]: MeshPart;
		};
		BlackBiome: Folder & {
			DeadTree: Model & {
				Part: Part;
				MeshPart: MeshPart;
			};
		};
		SmallRocks: Folder & {
			SmallRock2: Model & {
				BasePart: MeshPart & {
					PickUp: ProximityPrompt;
				};
			};
			SmallRock3: Model & {
				BasePart: MeshPart & {
					PickUp: ProximityPrompt;
				};
			};
			SmallRock1: Model & {
				BasePart: MeshPart & {
					PickUp: ProximityPrompt;
				};
			};
		};
		Ragdoll: Model & {
			LeftLowerArm: MeshPart & {
				Attachment1: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment0: Attachment;
			};
			RightUpperArm: MeshPart & {
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
				Attachment1: Attachment;
			};
			Head: Part & {
				["Noob Face"]: Decal;
				Mesh: SpecialMesh;
				Attachment1: Attachment;
			};
			UpperTorso: MeshPart & {
				RShoulder: Attachment;
				LShoulder: Attachment;
				Attachment1: Attachment;
			};
			RightHand: MeshPart & {
				Attachment1: Attachment;
			};
			LowerTorso: MeshPart & {
				HingeConstraint: HingeConstraint;
			};
			LeftUpperLeg: MeshPart & {
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
				Attachment1: Attachment;
			};
			LeftUpperArm: MeshPart & {
				Attachment1: Attachment;
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
			};
			RightLowerArm: MeshPart & {
				Attachment0: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment1: Attachment;
			};
			LeftHand: MeshPart & {
				Attachment1: Attachment;
			};
			RightUpperLeg: MeshPart & {
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
				Attachment1: Attachment;
			};
			LeftFoot: MeshPart & {
				Attachment1: Attachment;
			};
			RightLowerLeg: MeshPart & {
				Attachment0: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment1: Attachment;
			};
			RightFoot: MeshPart & {
				Attachment1: Attachment;
			};
			LeftLowerLeg: MeshPart & {
				Attachment0: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment1: Attachment;
			};
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
			IKControl: IKControl;
			AnimSaves: ObjectValue;
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
		Desert: Folder & {
			SandRock: Model;
		};
	};
	RBX_ANIMSAVES: Model & {
		Crow: ObjectValue & {
			["Imported Animation Clip"]: KeyframeSequence;
		};
		tomekcz: ObjectValue & {
			["Imported Animation Clip"]: KeyframeSequence;
			["Automatic Save"]: KeyframeSequence;
		};
	};
	Animations: Folder & {
		Axe: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
		Sword: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
		Rock: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
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
	};
}
