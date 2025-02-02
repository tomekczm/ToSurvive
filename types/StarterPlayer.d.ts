interface StarterPlayer extends Instance {
	StarterCharacter: Model & {
		Humanoid: Humanoid & {
			BodyTypeScale: NumberValue;
			Animator: Animator;
			BodyProportionScale: NumberValue;
			BodyDepthScale: NumberValue;
			BodyWidthScale: NumberValue;
			HeadScale: NumberValue;
			BodyHeightScale: NumberValue;
		};
		LeftFoot: MeshPart & {
			LeftFootWrapTarget: WrapTarget;
			OriginalSize: Vector3Value;
			LeftAnkle: Motor6D;
			AvatarPartScaleType: StringValue;
			LeftAnkleRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftFootAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		AnimSaves: ObjectValue;
		RightHand: MeshPart & {
			RightGripAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			OriginalSize: Vector3Value;
			RightWristRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightWrist: Motor6D;
			AvatarPartScaleType: StringValue;
			RightHandWrapTarget: WrapTarget;
		};
		HumanoidRootPart: Part & {
			RootRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			OriginalSize: Vector3Value;
		};
		Constraints: Folder & {
			RightKneeRig: HingeConstraint;
			LeftWristRig: BallSocketConstraint;
			RightAnkleRig: BallSocketConstraint;
			RightWristRig: BallSocketConstraint;
			WaistRig: HingeConstraint;
			LeftKneeRig: HingeConstraint;
			RightShoulderRig: BallSocketConstraint;
			LeftShoulderRig: BallSocketConstraint;
			RightHipRig: BallSocketConstraint;
			RightElbowRig: HingeConstraint;
			NeckRig: BallSocketConstraint;
			LeftAnkleRig: BallSocketConstraint;
			LeftElbowRig: HingeConstraint;
			LeftHipRig: BallSocketConstraint;
		};
		RightLowerLeg: MeshPart & {
			RightAnkleRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			OriginalSize: Vector3Value;
			RightKneeRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightKnee: Motor6D;
			RightLowerLegWrapTarget: WrapTarget;
			AvatarPartScaleType: StringValue;
		};
		LeftUpperLeg: MeshPart & {
			LeftUpperLegWrapTarget: WrapTarget;
			LeftHipRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftHip: Motor6D;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
			LeftKneeRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		LeftLowerLeg: MeshPart & {
			LeftKnee: Motor6D;
			OriginalSize: Vector3Value;
			LeftLowerLegWrapTarget: WrapTarget;
			AvatarPartScaleType: StringValue;
			LeftAnkleRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftKneeRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		LowerTorso: MeshPart & {
			WaistCenterAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftHipRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			Root: Motor6D;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
			RootRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightHipRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LowerTorsoWrapTarget: WrapTarget;
			WaistBackAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			WaistRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			WaistFrontAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		Head: MeshPart & {
			HatAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			OriginalSize: Vector3Value;
			NeckRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			FaceFrontAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			AvatarPartScaleType: StringValue;
			HairAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			Neck: Motor6D;
			FaceCenterAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			HeadWrapTarget: WrapTarget;
		};
		UpperTorso: MeshPart & {
			RightCollarAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			BodyBackAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			NeckRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftCollarAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			Waist: Motor6D;
			UpperTorsoWrapTarget: WrapTarget;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
			RightShoulderRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			BodyFrontAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			WaistRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftShoulderRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			NeckAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		TorsoAttach: IKControl;
		LeftAttach: IKControl;
		LeftUpperArm: MeshPart & {
			LeftShoulderRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftUpperArmWrapTarget: WrapTarget;
			LeftShoulderAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftElbowRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftShoulder: Motor6D;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
		};
		RightLowerArm: MeshPart & {
			OriginalSize: Vector3Value;
			RightLowerArmWrapTarget: WrapTarget;
			RightWristRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightElbowRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightElbow: Motor6D;
			AvatarPartScaleType: StringValue;
		};
		LeftHand: MeshPart & {
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
			LeftWrist: Motor6D;
			LeftGripAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftHandWrapTarget: WrapTarget;
			LeftWristRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		RightUpperArm: MeshPart & {
			OriginalSize: Vector3Value;
			RightUpperArmWrapTarget: WrapTarget;
			RightElbowRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightShoulder: Motor6D;
			RightShoulderRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightShoulderAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			AvatarPartScaleType: StringValue;
		};
		LeftLowerArm: MeshPart & {
			OriginalSize: Vector3Value;
			LeftLowerArmWrapTarget: WrapTarget;
			LeftElbowRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			LeftElbow: Motor6D;
			AvatarPartScaleType: StringValue;
			LeftWristRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
		};
		RightAttach: IKControl;
		RightUpperLeg: MeshPart & {
			OriginalSize: Vector3Value;
			RightHipRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			RightUpperLegWrapTarget: WrapTarget;
			RightHip: Motor6D;
			RightKneeRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			AvatarPartScaleType: StringValue;
		};
		RightFoot: MeshPart & {
			RightFootWrapTarget: WrapTarget;
			RightAnkleRigAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			OriginalSize: Vector3Value;
			RightAnkle: Motor6D;
			RightFootAttachment: Attachment & {
				OriginalPosition: Vector3Value;
			};
			AvatarPartScaleType: StringValue;
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
