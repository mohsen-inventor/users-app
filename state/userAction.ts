import { User } from '../types/User';

import {
    UserActionType,
    LoadUsersAction,
    LoadNextPageAction,
    SetCurrentPageAction,
    SetTotalUsersCountAction,
    FilterUsersAction,
    UpdateCurrentPageNumberAction,
    StartUserEditAction,
    EndUserEditAction,
    SaveUserAction,
    DeleteUserAction,
    RefreshLoadedUsers,
    RefreshMethod,
} from './userType';

const loadUsers = (users: User[]): LoadUsersAction => {
    return {
        type: UserActionType.LoadUsers,
        payload: {
            users: users,
        },
    };
};

const setCurrentPage = (page: number): SetCurrentPageAction => {
    return {
        type: UserActionType.SetCurrentPage,
        payload: {
            page: page,
        },
    };
};

const setTotalUsersCount = (count: number): SetTotalUsersCountAction => {
    return {
        type: UserActionType.SetTotalUsersCount,
        payload: {
            count: count,
        },
    };
};

const loadNextPage = (page: number): LoadNextPageAction => {
    return {
        type: UserActionType.LoadNextPage,
        payload: {
            nextPage: page,
        },
    };
};

const filterUsers = (searchTerm: string): FilterUsersAction => {
    return {
        type: UserActionType.FilterUsers,
        payload: {
            searchTerm,
        },
    };
};

const updateCurrentPageNumber = (
    page: number
): UpdateCurrentPageNumberAction => {
    return {
        type: UserActionType.UpdateCurrentPageNumber,
        payload: {
            page: page,
        },
    };
};

const startUserEdit = (clickX: number, clickY: number): StartUserEditAction => {
    return {
        type: UserActionType.StartUserEdit,
        payload: {
            openModal: true,
            clickCoords: {
                x: clickX,
                y: clickY,
            },
        },
    };
};

const endUserEdit = (): EndUserEditAction => {
    return {
        type: UserActionType.EndUserEdit,
        payload: {
            closeModal: false,
            clickCoords: {
                x: null,
                y: null,
            },
        },
    };
};

const saveUser = (user: User): SaveUserAction => {
    return {
        type: UserActionType.SaveUser,
        payload: {
            user: user,
        },
    };
};

const deleteUser = (userId: string): DeleteUserAction => {
    return {
        type: UserActionType.DeleteUser,
        payload: {
            userId: userId,
        },
    };
};

const refreshLoadedUsers = (
    userData: User | User[],
    method: RefreshMethod
): RefreshLoadedUsers => {
    return {
        type: UserActionType.RefreshLoadedUsers,
        payload: {
            userData,
            method,
        },
    };
};

export {
    loadUsers,
    loadNextPage,
    setCurrentPage,
    setTotalUsersCount,
    filterUsers,
    updateCurrentPageNumber,
    startUserEdit,
    endUserEdit,
    saveUser,
    deleteUser,
    refreshLoadedUsers,
};
