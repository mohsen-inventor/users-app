import {
    UserActionType,
    StartUserEditAction,
    EndUserEditAction,
} from './userType';

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

export { startUserEdit, endUserEdit };
