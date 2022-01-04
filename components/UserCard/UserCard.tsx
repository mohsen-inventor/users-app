import React, { useEffect, useState } from 'react';
import Circle from '../_ui/Circle/Circle';
import css from './UserCard.module.scss';

// App State (Redux)
import { AppState } from '../../state/store';
import { startUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
    data: {
        image: string
    }
}

const UserCard = ({ data }: Props) => {
    const dispatch = useDispatch();
    const { clickCoords } = useSelector<AppState>(state => state.user)

    const openModal = (e) => {
        dispatch(startUserEdit(e.clientX, e.clientY));
    }

    return (
        <div className={css.cardWrap}>
            <div className={css.userCard}>
                <div onClick={openModal} className={css.editAction}>Edit</div>
                <div className={css.content}>
                    <div className={css.photoBox}>
                        <Circle ui={{ minWidth: 100 }}>
                            <div className={css.photo}>
                                <img src={data.image} />
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