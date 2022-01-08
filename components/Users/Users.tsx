import React, { MouseEvent, useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import Button from '../_ui/Button/Button';
import Input from '../_ui/Input/Input';
import css from './Users.module.scss';


// Types
import { User } from '../../types/User';

// App State (Redux)
import { AppState } from '../../state/store';
import { loadUsers, setCurrentPage, setTotalUsersCount, filterUsers, loadNextPage, startUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
    page: number,
    usersData: User[],
    totalCount: number,
}

const Users = ({ usersData, totalCount, page }: Props) => {
    const dispatch = useDispatch();
    const { loadedUsers, currentPage } = useSelector<AppState>(state => state.user);

    useEffect(() => {
        console.log(loadedUsers);
    }, [loadedUsers])

    useEffect(() => {
        dispatch(loadUsers(usersData));
        dispatch(setCurrentPage(page));
        dispatch(setTotalUsersCount(totalCount));
    }, [])

    const nextPage = () => {
        dispatch(loadNextPage(currentPage + 1));
    }

    const openModal = (e: MouseEvent) => {
        dispatch(startUserEdit(e.clientX, e.clientY));
    }

    const onInputChange = (e) => {
        let term = e.target.value.trim();
        console.log('term', term);
        dispatch(filterUsers(term));
    }

    return (
        <div className={css.users}>
            <div className={css.header}>
                <h1>Users list</h1>
                <div className={css.search}>
                    <Input eChange={onInputChange} config={{ placeholder: 'Search...' }} />
                </div>
                <div className={css.addAction}>
                    <Button eClick={openModal} ui={{ icon: 'add-user' }}>add user</Button>
                </div>
            </div>
            <div className={css.grid}>
                {
                    loadedUsers.map((user: User, index) => {
                        return <UserCard userData={user} key={`user-${index}`} />
                    })
                }
            </div>
            <div className={css.footer}>
                <Button eClick={nextPage} ui={{ size: 'large' }}>
                    load more
                </Button>
            </div>
        </div>
    )
}

export default Users;