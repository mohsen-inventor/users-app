import React, { ChangeEvent, MouseEvent, useEffect } from 'react';
import UserCard from '../UserCard/UserCard';
import Button from '../_ui/Button/Button';
import Input from '../_ui/Input/Input';
import css from './Users.module.scss';
// Router
import { useRouter } from 'next/router';
// Gsap (Animation)
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

// Types
import { User } from '../../types/User';
// App State (Redux)
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../state/store';
import { loadUsers, setCurrentPage, setTotalUsersCount, filterUsers, fetchNextPage, startUserEdit, updateScroll, loadNextPage } from '../../state/userAction';
// Hooks
import useScrollPosition from './../../hooks/useScrollPosition';

// Gsap register plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

interface Props {
    page: number,
    usersData: User[],
    totalCount: number,
}

const Users = ({ usersData, totalCount, page }: Props) => {
    const dispatch = useDispatch();
    const loadedUsers = useSelector<AppState, User[]>((state: AppState) => state.user.loadedUsers);
    const currentPage = useSelector<AppState, number>((state: AppState) => state.user.currentPage);
    const totalUsersCount = useSelector<AppState, number>((state: AppState) => state.user.totalUsersCount);
    const currentScroll = useSelector<AppState, number>((state: AppState) => state.user.currentScroll);
    // Router
    const router = useRouter();
    // Current page scroll position
    let { currentPageScroll, scrollHeight } = useScrollPosition();

    // Component did mount
    useEffect(() => {
        router.push({
            query: { page: currentPage },
        })

        dispatch(loadUsers(usersData));
        dispatch(setCurrentPage(page));
        dispatch(setTotalUsersCount(totalCount));
    }, [])

    // Updating page query string after fetching latest data in the store
    useEffect(() => {
        router.push({
            query: { page: currentPage },
        })
    }, [currentPage])

    // Store current scroll position in App state
    useEffect(() => {
        let scrollTo = Math.round(currentPageScroll * scrollHeight);
        dispatch(updateScroll(scrollTo));
    }, [currentPageScroll]);

    // Persist scroll position after route change / page reload
    useEffect(() => {
        router.events.on("routeChangeComplete", () => {
            gsap.to(window, { scrollTo: currentScroll, duration: 0 });
        });
        return () => {
            router.events.off("routeChangeComplete", () => { });
        };
    }, [router.events, currentScroll]);

    const nextPage = (e: MouseEvent) => {
        dispatch(fetchNextPage(currentPage + 1));
    }

    const openModal = (e: MouseEvent) => {
        dispatch(startUserEdit(e.clientX, e.clientY));
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let term = e.target.value.trim();
        dispatch(filterUsers(term));
    }

    const isThereMorePages = () => {
        return totalUsersCount / 9 > currentPage;
    }

    return (
        <div className={css.users}>
            <div className={css.header}>
                <h1>Users list</h1>
                <div className={css.search}>
                    <Input eChange={onInputChange} placeholder='Search...' />
                </div>
                <div className={css.addAction}>
                    <Button eClick={openModal} ui={{ icon: 'add-user' }}>add user</Button>
                </div>
            </div>
            <div className={css.grid}>
                {
                    loadedUsers.map((user: User, index: number) => {
                        return <UserCard userData={user} key={`user-${index}`} />
                    })
                }
            </div>
            {isThereMorePages() &&
                <div className={css.footer}>
                    <Button eClick={nextPage} ui={{ size: 'large' }}>
                        load more
                    </Button>
                </div>
            }
        </div>
    )
}

export default Users;