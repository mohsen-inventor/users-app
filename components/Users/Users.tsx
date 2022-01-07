import React, { MouseEvent, useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import Button from '../_ui/Button/Button';
import Input from '../_ui/Input/Input';
import css from './Users.module.scss';

// Types
import { User } from '../../types/User';

// App State (Redux)
import { AppState } from '../../state/store';
import { startUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
    usersData: User[],
    children?: React.ReactNode
}

const Users = ({ usersData, children }: Props) => {
    const dispatch = useDispatch();
    const { toggleModal, clickCoords } = useSelector<AppState>(state => state.user);

    const arrayOf = (value: number) => {
        const array = [];

        for (let i = 0; i < value; i++) {
            array.push(i);
        }

        return array;
    }

    const openModal = (e: MouseEvent) => {
        dispatch(startUserEdit(e.clientX, e.clientY));
    }

    return (
        <div className={css.users}>
            <div className={css.header}>
                <h1>Users list</h1>
                <div className={css.search}>
                    <Input config={{ placeholder: 'Search...' }} />
                </div>
                <div className={css.addAction}>
                    <Button eClick={openModal} ui={{ icon: 'add-user' }}>add user</Button>
                </div>
            </div>
            <div className={css.grid}>
                {
                    usersData.map((user, index) => {
                        return <UserCard data={user} key={`user-${index}`} />
                    })
                }
            </div>
            <div className={css.footer}>
                <Button ui={{ size: 'large' }}>
                    load more
                </Button>
            </div>
        </div>
    )
}

export default Users;