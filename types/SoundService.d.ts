interface SoundService extends Instance {
	["Long Beep - Heart rate Monitor"]: Sound;
	WalkSounds: SoundGroup & {
		Grass: Sound;
		Gravel: Sound;
		PitchShiftSoundEffect: PitchShiftSoundEffect;
		Forest: Sound;
		Snow: Sound;
		Marble: Sound;
		Wood: Sound;
		Dirt: Sound;
		Sand: Sound;
		Fabric: Sound;
		Metal: Sound;
	};
	SoundGroup: SoundGroup & {
		WoodChestHit: Sound;
		OreDig: Sound;
		Dig: Sound;
		Grab: Sound;
		StruckGold: Sound;
	};
	Damaged: SoundGroup & {
		heartbeat: Sound;
		["Sword Hit (Impact)"]: Sound;
		["Ringing (Death)"]: Sound;
	};
	Wind: Sound;
}
