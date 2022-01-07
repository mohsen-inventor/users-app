import React, { MouseEvent, useEffect, useState } from 'react';
import Circle from '../_ui/Circle/Circle';
import css from './UserCard.module.scss';

// Types
import { User } from '../../types/User';

// App State (Redux)
import { AppState } from '../../state/store';
import { startUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../_ui/Button/Button';

// Hooks
import { useRandomPhoto } from '../../hooks/useRandomPhoto';

interface Props {
    user: User
}

const UserCard = ({ user }: Props) => {
    const dispatch = useDispatch();
    const { loading, photo } = useRandomPhoto();

    const openModal = (e: MouseEvent) => {
        /* Send user click coordinates to the App state
        to be used as the starting point for the user modal opening */
        dispatch(startUserEdit(e.clientX, e.clientY));
    }

    return (
        <div className={css.cardWrap}>
            <div className={css.userCard}>
                <div className={css.deleteAction}>
                    <Button eClick={openModal} ui={{ type: 'icon', size: 'small', icon: 'delete', animation: 'fade', noBorder: true }} />
                </div>
                <div className={css.editAction}>
                    <Button eClick={openModal} ui={{ type: 'icon', size: 'small', icon: 'edit', animation: 'fade', noBorder: true }} />
                </div>
                <div className={css.content}>
                    <div className={css.photoBox}>
                        <Circle ui={{ minWidth: 100 }}>
                            <div className={css.photo}>
                                <img src={photo} />
                            </div>
                        </Circle>
                    </div>
                    <div className={css.details}>
                        <div className={css.name}>
                            <h2>JESSICA MAY</h2>
                            <p className={css.date}>Created <span>01 Feb 2020</span></p>
                        </div>
                        <p className={css.desc}>Lorem ipsum dolor sit amet, consectetur…</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;