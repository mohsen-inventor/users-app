// User state
export interface UserState {
    toggleModal: boolean;
    clickCoords: {
        x: number | null;
        y: number | null;
    };
}

// User action type
export enum UserActionType {
    StartUserEdit = 'startUserEdit',
    EndUserEdit = 'endUserEdit',
}

// User Action interface
export interface StartUserEditAction {
    type: UserActionType.StartUserEdit;
    payload: {
        openModal: boolean;
        clickCoords: {
            x: number;
            y: number;
        };
    };
}

export interface EndUserEditAction {
    type: UserActionType.EndUserEdit;
    payload: {
        closeModal: boolean;
        clickCoords: {
            x: number | null;
            y: number | null;
        };
    };
}

// User generic action
export type UserAction = StartUserEditAction | EndUserEditAction;
