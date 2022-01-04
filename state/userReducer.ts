import { UserState, UserActionType, UserAction } from './userType';

const initialState: UserState = {
    toggleModal: false,
    clickCoords: {
        x: null,
        y: null,
    },
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default userReducer;
