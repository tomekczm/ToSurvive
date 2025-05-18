export function sample<T>(arr: Array<T>) {
    let index = math.random(1, arr.size())
	return arr[index - 1];
}