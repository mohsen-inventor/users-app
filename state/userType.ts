import { User } from '../types/User';

// Action type
export enum UserActionType {
    LoadUsers = 'loadUsers',
    LoadNextPage = 'loadNextPage',
    SetCurrentPage = 'setCurrentPage',
    SetTotalUsersCount = 'setTotalUsersCount',
    FilterUsers = 'filterUsers',
    UpdateCurrentPageNumber = 'UpdateCurrentPageNumber',
    StartUserEdit = 'startUserEdit',
    EndUserEdit = 'endUserEdit',
    SaveUser = 'saveUser',
    RefreshLoadedUsers = 'refreshLoadedUsers',
    DeleteUser = 'deleteUser',
}

export enum RefreshMethod {
    AddUser = 'addUser',
    RemoveUser = 'removeUser',
    ReplaceAll = 'replaceAll',
}

// State
export interface UserState {
    loadedUsers: User[];
    currentPage: number;
    totalUsersCount: number;
    toggleModal: boolean;
    clickCoords: {
        x: number | null;
        y: number | null;
    };
}

// Action interface
export interface LoadUsersAction {
    type: UserActionType.LoadUsers;
    payload: {
        users: User[];
    };
}

export interface SetCurrentPageAction {
    type: UserActionType.SetCurrentPage;
    payload: {
        page: number;
    };
}

export interface SetTotalUsersCountAction {
    type: UserActionType.SetTotalUsersCount;
    payload: {
        count: number;
    };
}
export interface LoadNextPageAction {
    type: UserActionType.LoadNextPage;
    payload: {
        nextPage: number;
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

export interface RefreshLoadedUsers {
    type: UserActionType.RefreshLoadedUsers;
    payload: {
        userData: User | User[];
        method: RefreshMethod;
    };
}

// Generic action type
export type UserAction =
    | LoadUsersAction
    | LoadNextPageAction
    | SetCurrentPageAction
    | SetTotalUsersCountAction
    | FilterUsersAction
    | UpdateCurrentPageNumberAction
    | SaveUserAction
    | DeleteUserAction
    | RefreshLoadedUsers
    | StartUserEditAction
    | EndUserEditAction;
