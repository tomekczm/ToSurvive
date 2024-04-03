export function evalTerrainSequence(ns: NumberSequence, time: number) {
    const evaluated = evalNumberSequence(ns, (time + 1) / 2) 
    return 2 * evaluated - 1
}

export function evalNumberSequence(ns: NumberSequence, time: number) {
    const keypoints = ns.Keypoints
    if (time === 0) return keypoints[0].Value
    if (time === 1) return keypoints[keypoints.size()].Value

    for(let i of $range(1, keypoints.size() - 1)) {
        const _self = keypoints[i - 1]
        const _next = keypoints[i]

        if(time >= _self.Time && time < _next.Time) {
            const alpha = (time - _self.Time) / (_next.Time - _self.Time)
            return (_next.Value - _self.Value) * alpha + _self.Value
        }
    }
    return 0
}
