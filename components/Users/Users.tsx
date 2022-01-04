import React, { Fragment, useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import Button from '../_ui/Button/Button';
import Input from '../_ui/Input/Input';
import css from './Users.module.scss';

// App State (Redux)
import { AppState } from '../../state/store';
import { startUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';

interface Props {

}

const Users = (props: Props) => {
    const dispatch = useDispatch();
    const [faces, setFaces] = useState([]);
    const { toggleModal, clickCoords } = useSelector<AppState>(state => state.user);

    useEffect(() => {
        const clientId = 'LBLUhqu1O32TDmZzVvaziMvtTNHrfJX-hXZr5jXzYHU';

        const fetchPhotos = async () => {
            const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${clientId}&page=4&query=faces`);
            const { results } = await response.json();

            const thumbs = results.map((item) => {
                return item.urls.thumb;
            })
            setFaces(thumbs);
        }

        fetchPhotos();
    }, []);

    const arrayOf = (value: number) => {
        const array = [];

        for (let i = 0; i < value; i++) {
            array.push(i);
        }

        return array;
    }

    const openModal = (e) => {
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
                    faces.map((src, index) => {
                        return <UserCard data={{ image: src }} key={`user-${index}`} />
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