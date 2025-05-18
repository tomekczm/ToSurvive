import { ClientItem } from "./ClientItem"

export function GenericItem<T extends Instance = Instance>() {
    const clazz = class extends ClientItem<T> {
        constructor(instance: T) {
            super(instance as T)
        }
    }
    return ((item: T) => {
        return new clazz(item);
    })
}