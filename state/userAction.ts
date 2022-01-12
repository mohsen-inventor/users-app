import { User } from '../types/User';

import {
    UserActionType,
    LoadUsersAction,
    FetchNextPageAction,
    LoadNextPageAction,
    FetchToPageAction,
    LoadUsersToPageAction,
    SetCurrentPageAction,
    SetTotalUsersCountAction,
    FilterUsersAction,
    UpdateCurrentPageNumberAction,
    StartUserEditAction,
    EndUserEditAction,
    SaveUserAction,
    DeleteUserAction,
    RefreshLoadedUsersAction,
    UpdateScrollAction,
    RefreshMethod,
} from './userType';

const loadUsers = (users: User[], page?: number): LoadUsersAction => {
    return {
        type: UserActionType.LoadUsers,
        payload: {
            users: users,
            page: page,
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

const fetchNextPage = (pageNum: number): FetchNextPageAction => {
    return {
        type: UserActionType.FetchNextPage,
        payload: {
            pageNum,
        },
    };
};

const loadNextPage = (nextUsers: User[]): LoadNextPageAction => {
    return {
        type: UserActionType.LoadNextPage,
        payload: {
            nextUsers,
        },
    };
};

const fetchToPage = (toPage: number): FetchToPageAction => {
    return {
        type: UserActionType.FetchToPage,
        payload: {
            toPage,
        },
    };
};

const loadUsersToPage = (users: User[]): LoadUsersToPageAction => {
    return {
        type: UserActionType.LoadUsersToPage,
        payload: {
            users,
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
): RefreshLoadedUsersAction => {
    return {
        type: UserActionType.RefreshLoadedUsers,
        payload: {
            userData,
            method,
        },
    };
};

const updateScroll = (scrollPosition: number): UpdateScrollAction => {
    return {
        type: UserActionType.UpdateScroll,
        payload: {
            scrollPosition,
        },
    };
};

export {
    loadUsers,
    fetchNextPage,
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
    updateScroll,
};
