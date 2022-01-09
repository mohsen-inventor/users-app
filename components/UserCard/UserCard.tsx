import React, { MouseEvent, useEffect, useState } from 'react';
import Circle from '../_ui/Circle/Circle';
import css from './UserCard.module.scss';
// Types
import { User } from '../../types/User';
// App State (Redux)
import { deleteUser, startUserEdit } from '../../state/userAction';
import { useDispatch } from 'react-redux';
import Button from '../_ui/Button/Button';

interface Props {
    userData: User
}

const UserCard = ({ userData }: Props) => {
    const dispatch = useDispatch();

    const openModal = (e: MouseEvent) => {
        /* Send user click coordinates to the App state
        to be used as the starting point for the user modal opening */
        dispatch(startUserEdit(e.clientX, e.clientY));
    }

    const onDeleteUser = () => {
        dispatch(deleteUser(userData.id));
    }

    return (
        <div className={css.cardWrap}>
            <div className={css.userCard}>
                <div className={css.deleteAction}>
                    <Button eClick={onDeleteUser} ui={{ type: 'icon', size: 'small', icon: 'delete', animation: 'fade', noBorder: true }} />
                </div>
                <div className={css.editAction}>
                    <Button eClick={openModal} ui={{ type: 'icon', size: 'small', icon: 'edit', animation: 'fade', noBorder: true }} />
                </div>
                <div className={css.content}>
                    <div className={css.photoBox}>
                        <Circle ui={{ minWidth: 100 }}>
                            <div className={css.photo}>
                                <img src={userData.photoUrl} />
                            </div>
                        </Circle>
                    </div>
                    <div className={css.details}>
                        <div className={css.name}>
                            <h2>{userData.name}</h2>
                            <p className={css.date}>Created <span>{userData.createdAt}</span></p>
                        </div>
                        <p className={css.desc}>{userData.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;