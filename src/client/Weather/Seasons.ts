import { CollectionService, Players, TweenService, Workspace } from "@rbxts/services";

const terrain = Workspace.Terrain
const color3Grass = new Instance("Color3Value");

color3Grass.Value = terrain.GetMaterialColor("Grass");
color3Grass.Changed.Connect((color) => {
    terrain.SetMaterialColor("Grass", color);
})

const color3LeafyGrass = new Instance("Color3Value");
color3LeafyGrass.Value = terrain.GetMaterialColor("LeafyGrass");
color3LeafyGrass.Changed.Connect((color) => {
    terrain.SetMaterialColor("LeafyGrass", color);
})

const SeasonStartImage = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("DayNotificator").WaitForChild("SeasonNotif") as ImageLabel

const TRANSITION_TIME = 10;

function setGrassColor(grassColor: Color3) {
    TweenService.Create(color3Grass, new TweenInfo(TRANSITION_TIME), {
        Value: grassColor
    }).Play()
}
function setLeafyGrass(grassColor: Color3) {
    TweenService.Create(color3LeafyGrass, new TweenInfo(TRANSITION_TIME), {
        Value: grassColor
    }).Play()
}
function setTreeColor(colors: Color3[]) {
    for(const tree of CollectionService.GetTagged("RecolorableTree")) {
        assert(tree.IsA("BasePart"))
        TweenService.Create(
            tree,
            new TweenInfo(TRANSITION_TIME),
            {
                Color: colors.Sample()
            }
        ).Play()
    }
}

const SeasonLookup = {
    "winter": "rbxassetid://133626942169090",
    "summer": "rbxassetid://83681178007738",
    "spring": "",
    "autumn": "",
}

type SEASONS = "autumn" | "winter" | "summer" | "spring"
function setSeason(season: SEASONS) {
    Workspace.SetAttribute("Season", season)
    SeasonStartImage.ImageTransparency = 1;
    
    const TWEEN_DURATION = 2.5;
    SeasonStartImage.Image = SeasonLookup[season]
    print(SeasonLookup[season])
    TweenService.Create(SeasonStartImage, new TweenInfo(TWEEN_DURATION), { ImageTransparency: 0 }).Play()
    task.wait(TWEEN_DURATION + 5);
    TweenService.Create(SeasonStartImage, new TweenInfo(TWEEN_DURATION), { ImageTransparency: 1 }).Play()
    task.wait(TWEEN_DURATION);
}

export function getSeason() {
    return (Workspace.GetAttribute("Season") ?? "summer") as SEASONS
}

task.spawn(() => {
    while(true) {
        const springPalette = [
            Color3.fromRGB(188,214,100),
            Color3.fromRGB(120,182,84),
            Color3.fromRGB(153,196,96),
            Color3.fromRGB(102,171,77),
            Color3.fromRGB(84,162,68)
        ]
        task.wait(17);
        setGrassColor(springPalette.Sample())
        setLeafyGrass(springPalette.Sample())
        setTreeColor([
            Color3.fromRGB(254, 86, 104),    
            Color3.fromRGB	(153,193,79),
            Color3.fromRGB	(110,148,38) 
        ])

        task.wait(TRANSITION_TIME / 2)
        setSeason("spring")
    
        task.wait(17);

        // Summer
        setGrassColor(Color3.fromRGB(111, 126, 62))
        setLeafyGrass(Color3.fromRGB(106, 134, 64))
        setTreeColor([
            Color3.fromRGB(255, 176, 0),
            Color3.fromRGB(49, 193, 138),
            Color3.fromRGB(58, 191, 56)
        ])

        task.wait(TRANSITION_TIME / 2)
        setSeason("summer")
    
        task.wait(17)

        // autumn
        setGrassColor(Color3.fromRGB(212,91,18))
        setLeafyGrass([
            Color3.fromRGB(156, 39, 6),
            Color3.fromRGB(96, 60, 20)
        ].Sample()) // Secondary color
        setTreeColor([
            Color3.fromRGB(97,78,36),   
            Color3.fromRGB(210,3,3),   
            Color3.fromRGB(230,132,14),  
            Color3.fromRGB(249,226,19),  
            Color3.fromRGB	(153,193,79) 
        ])

        task.wait(TRANSITION_TIME / 2)
        setSeason("autumn")

        task.wait(17)
        // Winter
        setGrassColor(new Color3(1,1,1))
        setLeafyGrass(Color3.fromRGB(107, 107, 107))
        setTreeColor([
            Color3.fromRGB(214, 214, 214),
            Color3.fromRGB(150, 150, 150),
            Color3.fromRGB(255, 255, 255),
            Color3.fromRGB(128, 187, 219)
        ])

        task.wait(TRANSITION_TIME / 2)
        setSeason("winter")
    }
})