const max32 = math.pow(2, 32) - 1
export function hashCode(input: string) {
    let val = 0;

    const n = input.size()

    for(const i of $range(1, n)) {
        val = (val + (string.byte(i as unknown as string) as unknown as number) * math.pow(31, n - i)) % max32
    }

    return val;
}