import { User } from '../types/User';

import {
    UserState,
    UserActionType,
    UserAction,
    RefreshMethod,
} from './userType';

const initialState: UserState = {
    loadedUsers: [],
    nextUsers: [],
    totalUsersCount: 0,
    currentPage: 1,
    currentScroll: 0,
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
        case UserActionType.FetchNextPage:
            let isNextPage = state.totalUsersCount / 9 > state.currentPage;

            return {
                ...state,
                currentPage: isNextPage
                    ? state.currentPage + 1
                    : state.currentPage,
            };
        case UserActionType.LoadNextPage:
            return {
                ...state,
                loadedUsers: action.payload.nextUsers,
            };
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
                    // Display newly added users first
                    updatedUsers.sort(
                        (a: User, b: User) =>
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime()
                    );
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
        case UserActionType.UpdateScroll:
            return {
                ...state,
                currentScroll: action.payload.scrollPosition,
            };
        default:
            return state;
    }
};

export default userReducer;
