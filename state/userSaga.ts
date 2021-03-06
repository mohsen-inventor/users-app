import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { User } from '../types/User';
import {
    UserActionType,
    FetchNextPageAction,
    LoadNextPageAction,
    SaveUserAction,
    DeleteUserAction,
    FilterUsersAction,
    RefreshMethod,
} from './userType';
import {
    loadUsers,
    setCurrentPage,
    setTotalUsersCount,
    refreshLoadedUsers,
    loadNextPage,
} from './userAction';

// Saga workers
function* fetchNexPage(action: FetchNextPageAction) {
    try {
        const { data } = yield call(
            axios.get,
            `${process.env.NEXT_PUBLIC_SERVER}/api/users?page=${action.payload.pageNum}`
        );

        const { results: users, count } = yield data;

        yield put(setTotalUsersCount(count));
        yield put(loadNextPage(users));

        console.log(users);
    } catch (error) {
        // We should handle error here
        // console.log(error);
    }
}

function* saveUser(action: SaveUserAction) {
    try {
        const { data: user } = yield call(
            axios.post,
            `${process.env.NEXT_PUBLIC_SERVER}/api/users`,
            action.payload.user
        );

        yield put(refreshLoadedUsers(user, RefreshMethod.AddUser));
    } catch (error) {
        // console.log(error);
    }
}

function* deleteUser(action: DeleteUserAction) {
    try {
        const { data: user } = yield call(
            axios.delete,
            `${process.env.NEXT_PUBLIC_SERVER}/api/users`,
            { data: action.payload.userId }
        );

        yield put(refreshLoadedUsers(user, RefreshMethod.RemoveUser));
    } catch (error) {
        // console.log(error);
    }
}

function* searchUsers(action: FilterUsersAction) {
    try {
        const { data } = yield call(
            axios.get,
            `${process.env.NEXT_PUBLIC_SERVER}/api/users/search?term=${action.payload.searchTerm}`
        );

        const { results: foundUsers } = yield data;

        yield put(refreshLoadedUsers(foundUsers, RefreshMethod.ReplaceAll));
    } catch (error) {
        // console.log(error);
    }
}

// Saga watcher (rootSaga)
function* rootSaga() {
    yield all([
        takeLatest(UserActionType.FetchNextPage, fetchNexPage),
        takeLatest(UserActionType.SaveUser, saveUser),
        takeLatest(UserActionType.FilterUsers, searchUsers),
        takeLatest(UserActionType.DeleteUser, deleteUser),
    ]);
}

// export rootSaga
export default rootSaga;
