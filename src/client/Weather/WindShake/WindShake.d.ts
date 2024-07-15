interface WindShakeSettings
{
	WindDirection?: Vector3
	WindSpeed?: number
	WindPower?: number
}

interface WindShake
{
	/**
	 * Initializes the wind shake logic and adds shake to all tagged objects
	 */
	Init(config: {
        MatchWorkspaceWind: boolean
    }): void

	/**
	 * Halts and clears the wind shake logic and all object shakes
	 */
	Cleanup(): void

	/**
	 * Halts the wind shake logic without clearing
	 */
	Pause(): void

	/**
	 * Resumes the wind shake logic without clearing
	 */
	Resume(): void

	/**
	 * Adds an object to be shaken
	 * @param object The object to apply shaking to
	 * @param settings The settings to apply to this object's shake
	 */
	AddObjectShake(object: BasePart, settings?: WindShakeSettings): void

	/**
	 * Removes shake from an object
	 * @param object The object to remove shaking from
	 */
	RemoveObjectShake(object: BasePart): void

	/**
	 * Sets the default settings for future object shake additions
	 * @param settings The settings to be used
	 * @deprecated Deprecated in favor of setting the Attributes of the WindShake ModuleScript
	 */
	SetDefaultSettings(settings: WindShakeSettings): void;

	/**
	 * Updates the shake settings of an object already added
	 * @param object The object to apply shake settings to
	 * @param settings The settings to apply to this object's shake
	 * @deprecated Deprecated in favor of setting the Attributes of the object
	 */
	UpdateObjectSettings(object: BasePart, settings: WindShakeSettings): void;

	/**
	 * Updates the shake settings of all active shakes
	 * @param settings The settings to apply to all objects' shake
	 */
	UpdateAllObjectSettings(settings: WindShakeSettings): void;
}

declare const WindShake: WindShake;

export = WindShake;