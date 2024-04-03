export function sample<T>(arr: Array<T>, set: T | undefined = undefined) {
    let index = math.random(0, arr.size() - 1)
    if(set !== undefined) arr[index] = set
	return arr[index];
}