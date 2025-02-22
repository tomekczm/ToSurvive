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
		PlayerModule: ModuleScript & {
			CommonUtils: ModuleScript & {
				FlagUtil: ModuleScript;
				ConnectionUtil: ModuleScript;
			};
			CameraModule: ModuleScript & {
				CameraUtils: ModuleScript;
				Invisicam: ModuleScript;
				VehicleCamera: ModuleScript & {
					VehicleCameraCore: ModuleScript;
					VehicleCameraConfig: ModuleScript;
				};
				BaseCamera: ModuleScript;
				VRVehicleCamera: ModuleScript;
				CameraToggleStateController: ModuleScript;
				CameraUI: ModuleScript;
				TransparencyController: ModuleScript;
				Poppercam: ModuleScript;
				ClassicCamera: ModuleScript;
				MouseLockController: ModuleScript;
				VRBaseCamera: ModuleScript;
				CameraInput: ModuleScript;
				ZoomController: ModuleScript & {
					Popper: ModuleScript;
				};
				BaseOcclusion: ModuleScript;
				OrbitalCamera: ModuleScript;
				LegacyCamera: ModuleScript;
				VRCamera: ModuleScript;
			};
			Shift_Lock: BindableEvent;
			ControlModule: ModuleScript & {
				TouchJump: ModuleScript;
				Keyboard: ModuleScript;
				ClickToMoveDisplay: ModuleScript;
				VehicleController: ModuleScript;
				DynamicThumbstick: ModuleScript;
				TouchThumbstick: ModuleScript;
				ClickToMoveController: ModuleScript;
				PathDisplay: ModuleScript;
				BaseCharacterController: ModuleScript;
				Gamepad: ModuleScript;
				VRNavigation: ModuleScript;
			};
		};
		TS: Folder & {
			Inventory: Folder & {
				Inventory: ModuleScript;
			};
			CamShake: ModuleScript;
			ProximityPrompts: ModuleScript;
			UI: Folder & {
				KeyHint: ModuleScript;
				Tree: ModuleScript;
				BasicHints: ModuleScript;
			};
			main: LocalScript;
			Item: Folder & {
				Rock: ModuleScript;
				Lantern: ModuleScript;
				Sword: ModuleScript;
				ItemRegistrar: ModuleScript;
				Hammer: ModuleScript;
				GenericItems: ModuleScript;
				WaterBucket: ModuleScript;
				AxeItem: ModuleScript;
				Shovel: ModuleScript;
				Spear: ModuleScript;
				ClientItem: ModuleScript;
			};
			Events: Folder & {
				OnKnockback: ModuleScript;
				OnCharacterAdded: ModuleScript;
			};
			ItemAbility: Folder & {
				MeleeSwing: ModuleScript;
				SwingAbility: ModuleScript;
				EventInterfaces: ModuleScript;
				RotateAbility: ModuleScript;
				CraftAndBuildAbility: ModuleScript;
				Viewmodel: ModuleScript;
				PointAtAbility: ModuleScript;
				SelfBuildAbility: ModuleScript;
				ThrowAbility: ModuleScript;
				BuildAbility: ModuleScript;
			};
			Notifications: ModuleScript;
			Weather: Folder & {
				WindShake: Folder & {
					WindShake: ModuleScript;
					Settings: ModuleScript;
					VectorMap: ModuleScript;
				};
				Wind: ModuleScript;
				TimeConditions: ModuleScript;
			};
			VFX: Folder & {
				Ragdoll: ModuleScript;
				Crows: ModuleScript;
				Soul: ModuleScript;
				SpinningItems: ModuleScript;
				ChestMenu: ModuleScript;
				MousePointer: ModuleScript;
				FlagVFX: ModuleScript;
				Walking: ModuleScript;
				HurtHighlight: ModuleScript;
				Ores: ModuleScript;
				Weather: ModuleScript;
				LowHealth: ModuleScript;
				ProjectileDissapear: ModuleScript;
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
