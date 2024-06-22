export function sample<T>(arr: Array<T>, set: T | undefined = undefined) {
    let index = math.random(1, arr.size())
    if(set !== undefined) arr[index - 1] = set
	return arr[index - 1];
}