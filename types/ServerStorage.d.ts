interface ServerStorage extends Instance {
	Animations: Folder & {
		Sword: Folder & {
			Hold: Animation;
		};
	};
	RBX_ANIMSAVES: Model & {
		tomekcz: ObjectValue & {
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
										["mixamorig:LeftShoulder"]: Pose & {
											["mixamorig:LeftArm"]: Pose & {
												["mixamorig:LeftForeArm"]: Pose;
											};
										};
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
	Tools: Folder & {
		Sword: Model & {
			RootPart: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment;
			};
			Events: Folder;
		};
	};
}
