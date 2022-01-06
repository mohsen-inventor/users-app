import { User } from '../types/User';

// Action type
export enum UserActionType {
    LoadUsers = 'loadUsers',
    FilterUsers = 'filterUsers',
    UpdateCurrentPageNumber = 'UpdateCurrentPageNumber',
    StartUserEdit = 'startUserEdit',
    EndUserEdit = 'endUserEdit',
    SaveUser = 'saveUser',
    DeleteUser = 'deleteUser',
}

// State
export interface UserState {
    loadedUsers: User[];
    currentPage: number;
    toggleModal: boolean;
    clickCoords: {
        x: number | null;
        y: number | null;
    };
}

// Action interface
export interface LoadUsersAction {
    type: UserActionType.LoadUsers;
    payload?: {
        page?: number;
    };
}
export interface FilterUsersAction {
    type: UserActionType.FilterUsers;
    payload: {
        searchTerm: string;
    };
}

export interface UpdateCurrentPageNumberAction {
    type: UserActionType.UpdateCurrentPageNumber;
    payload: {
        page: number;
    };
}

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

export interface SaveUserAction {
    type: UserActionType.SaveUser;
    payload: {
        user: User;
    };
}

export interface DeleteUserAction {
    type: UserActionType.DeleteUser;
    payload: {
        userId: string;
    };
}

// Generic action type
export type UserAction =
    | LoadUsersAction
    | FilterUsersAction
    | UpdateCurrentPageNumberAction
    | SaveUserAction
    | DeleteUserAction
    | StartUserEditAction
    | EndUserEditAction;
