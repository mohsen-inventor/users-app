import React from 'react';
import UserCard from '../UserCard/UserCard';
import css from './Users.module.scss';

interface Props {

}

const Users = (props: Props) => {

    const arrayOf = (value) => {
        const array = [];

        for (let i = 0; i < value; i++) {
            array.push(i);
        }

        return array;
    }

    return (
        <div className={css.users}>
            <div className={css.header}>
                <h1>Users list</h1>
                <div className={css.search}>
                    Search box
                </div>
            </div>
            <div className={css.grid}>
                {
                    arrayOf(20).map((item, index) => {
                        return <UserCard key={`user-${index}`} />
                    })
                }
            </div>
            <div className={css.footer}>Users footer</div>
        </div>
    )
}

export default Users;