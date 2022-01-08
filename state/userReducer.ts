import { User } from '../types/User';

import {
    UserState,
    UserActionType,
    UserAction,
    RefreshMethod,
} from './userType';

const initialState: UserState = {
    loadedUsers: [],
    totalUsersCount: 0,
    currentPage: 1,
    toggleModal: false,
    clickCoords: {
        x: null,
        y: null,
    },
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionType.LoadUsers:
            return {
                ...state,
                loadedUsers: action.payload.users,
            };
        case UserActionType.SetCurrentPage:
            return {
                ...state,
                currentPage: action.payload.page,
            };
        case UserActionType.SetTotalUsersCount:
            return {
                ...state,
                totalUsersCount: action.payload.count,
            };
        case UserActionType.LoadNextPage:
            return state;
        case UserActionType.FilterUsers:
            return state;
        case UserActionType.StartUserEdit:
            return {
                ...state,
                toggleModal: action.payload.openModal,
                clickCoords: {
                    x: action.payload.clickCoords.x,
                    y: action.payload.clickCoords.y,
                },
            };
        case UserActionType.EndUserEdit:
            return {
                ...state,
                toggleModal: action.payload.closeModal,
                clickCoords: {
                    x: action.payload.clickCoords.x,
                    y: action.payload.clickCoords.y,
                },
            };
        case UserActionType.SaveUser:
            return state;
        case UserActionType.DeleteUser:
            return state;
        case UserActionType.RefreshLoadedUsers:
            const { userData } = action.payload;
            const { method } = action.payload;

            let updatedUsers = [];

            switch (method) {
                case RefreshMethod.AddUser:
                    updatedUsers = [...state.loadedUsers, userData];
                    break;
                case RefreshMethod.RemoveUser:
                    updatedUsers = state.loadedUsers.filter(
                        (user) => user.id !== userData.id
                    );
                    break;
                case RefreshMethod.ReplaceAll:
                    updatedUsers = userData;
            }

            return {
                ...state,
                loadedUsers: updatedUsers,
            };
        default:
            return state;
    }
};

export default userReducer;
