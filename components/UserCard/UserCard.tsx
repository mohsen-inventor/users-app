import React from 'react';
import Circle from '../_ui/Circle/Circle';
import css from './UserCard.module.scss';

interface Props {

}

const UserCard = (props: Props) => {
    return (
        <div className={css.cardWrap}>
            <div className={css.userCard}>
                <div className={css.content}>
                    <div className={css.photoBox}>
                        <Circle ui={{ minWidth: 80 }}>
                            <div className={css.photo}></div>
                        </Circle>
                    </div>
                    <div className={css.description}>Description</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;