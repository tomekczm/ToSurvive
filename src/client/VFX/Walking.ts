import { Players, ReplicatedStorage, RunService, UserInputService } from "@rbxts/services";
import { LocalPlayer } from "client/Character/LocalPlayer";

const Animations = ReplicatedStorage.Animations

const WALK_FORWARD = Animations.Walking
const WALK_BACKWARDS = Animations.WalkBackwards
const WALK_LEFT = Animations.Left
const WALK_RIGHT = Animations.Right

function characterAdded(_character: Model) {
    const character = _character as StarterPlayer["StarterCharacter"];
    const humanoid = character.Humanoid;
    const animator = humanoid.Animator;

    const walkForward = animator.LoadAnimation(WALK_FORWARD);
    const walkBackwards = animator.LoadAnimation(WALK_BACKWARDS);
    const walkLeft = animator.LoadAnimation(WALK_LEFT);
    const walkRight = animator.LoadAnimation(WALK_RIGHT);

    let currentAnimations: AnimationTrack[] = [];

    const animationMap = [
        walkForward,
        walkBackwards,
        walkLeft,
        walkRight
    ]

    function playAnimation(...animations: AnimationTrack[]) {
        for(const animation of animationMap) {
            if(animations.includes(animation)) {
                if(!animation.IsPlaying)
                    animation.Play()
                animation.AdjustWeight(1 / animations.size())
            } else {
                animation.Stop()
            }
        }
    }


    RunService.RenderStepped.Connect(() => {
        let wPressed = UserInputService.IsKeyDown(Enum.KeyCode.W) || UserInputService.IsKeyDown(Enum.KeyCode.Up);
        let sPressed = UserInputService.IsKeyDown(Enum.KeyCode.S) || UserInputService.IsKeyDown(Enum.KeyCode.Down);;
        let aPressed = UserInputService.IsKeyDown(Enum.KeyCode.A);
        let dPressed = UserInputService.IsKeyDown(Enum.KeyCode.D);

        if(
            LocalPlayer.statusEffects.hasStatusEffect("LostBalance")
        ) {
            sPressed = true

            wPressed = false
            aPressed = false
            dPressed = false
        }

        if(wPressed && sPressed) {
            wPressed = false
            sPressed = false
        }

        if(aPressed && dPressed) {
            aPressed = false
            dPressed = false
        }

        if(!wPressed && !sPressed && !aPressed && !dPressed) {
            playAnimation()
            return
        }

        // Handle blended animations
        if (wPressed && aPressed) {
            // Both forward and left pressed, blend at 50% each
            playAnimation(walkForward, walkLeft);
        } else if (wPressed && dPressed) {
            playAnimation(walkForward, walkRight);
        } else if (sPressed && aPressed) {
            // Both backward and left pressed, blend at 50% each
            playAnimation(walkBackwards, walkLeft);
        } else if (sPressed && dPressed) {
            // Both backward and right pressed, blend at 50% each
            playAnimation(walkBackwards, walkRight);
        } else {
            // Single key presses, no blending
            if (wPressed) {
                playAnimation(walkForward);
            } else if (sPressed) {
                playAnimation(walkBackwards);
            } else if (aPressed) {
                playAnimation(walkLeft);
            } else if (dPressed) {
                playAnimation(walkRight);
            }
        }
    });
}

const character = Players.LocalPlayer.Character
if(character) {
    characterAdded(character)
}

Players.LocalPlayer.CharacterAdded.Connect(characterAdded);