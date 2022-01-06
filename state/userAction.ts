import { User } from '../types/User';

import {
    UserActionType,
    LoadUsersAction,
    FilterUsersAction,
    UpdateCurrentPageNumberAction,
    StartUserEditAction,
    EndUserEditAction,
    SaveUserAction,
    DeleteUserAction,
} from './userType';

const loadUsers = (page: number = 1): LoadUsersAction => {
    return {
        type: UserActionType.LoadUsers,
        payload: {
            page: page,
        },
    };
};

const filterUsers = (searchTerm: string): FilterUsersAction => {
    return {
        type: UserActionType.FilterUsers,
        payload: {
            searchTerm: searchTerm,
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

export {
    loadUsers,
    filterUsers,
    updateCurrentPageNumber,
    startUserEdit,
    endUserEdit,
    saveUser,
    deleteUser,
};
