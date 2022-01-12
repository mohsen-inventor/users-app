import { User } from '../types/User';

// Action type
export enum UserActionType {
    LoadUsers = 'loadUsers',
    FetchToPage = 'fetchToPage',
    LoadUsersToPage = 'loadUsersToPage',
    FetchNextPage = 'fetchNextPage',
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
    UpdateScroll = 'updateScroll',
}

export enum RefreshMethod {
    AddUser = 'addUser',
    RemoveUser = 'removeUser',
    ReplaceAll = 'replaceAll',
}

// State
export interface UserState {
    loadedUsers: User[];
    nextUsers: User[];
    currentPage: number;
    currentScroll: number;
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
        page?: number;
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
export interface FetchNextPageAction {
    type: UserActionType.FetchNextPage;
    payload: {
        pageNum: number;
    };
}
export interface LoadNextPageAction {
    type: UserActionType.LoadNextPage;
    payload: {
        nextUsers: User[];
    };
}

export interface FetchToPageAction {
    type: UserActionType.FetchToPage;
    payload: {
        toPage: number;
    };
}

export interface LoadUsersToPageAction {
    type: UserActionType.LoadUsersToPage;
    payload: {
        users: User[];
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

export interface RefreshLoadedUsersAction {
    type: UserActionType.RefreshLoadedUsers;
    payload: {
        userData: User | User[] | any;
        method: RefreshMethod;
    };
}

export interface UpdateScrollAction {
    type: UserActionType.UpdateScroll;
    payload: {
        scrollPosition: number;
    };
}

// Generic action type
export type UserAction =
    | LoadUsersAction
    | FetchNextPageAction
    | LoadNextPageAction
    | FetchToPageAction
    | LoadUsersToPageAction
    | SetCurrentPageAction
    | SetTotalUsersCountAction
    | FilterUsersAction
    | UpdateCurrentPageNumberAction
    | SaveUserAction
    | DeleteUserAction
    | RefreshLoadedUsersAction
    | StartUserEditAction
    | EndUserEditAction
    | UpdateScrollAction;
