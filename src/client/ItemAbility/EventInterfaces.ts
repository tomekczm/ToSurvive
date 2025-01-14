export interface InputBeganEvent {
    inputBegan(input: InputObject, processed: boolean): void;
}

export interface InputEndedEvent {
    inputEnded(input: InputObject, processed: boolean): void;
}

export interface InputChangedEvent {
    inputChanged(input: InputObject, processed: boolean): void;
}