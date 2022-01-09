import React, { useRef, useEffect, useState, Ref, RefObject } from 'react'
import css from './UserEditModal.module.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// Types
import { User } from '../../types/User';
import { ClickCoords } from '../../types/Ui';
// App State (Redux)
import { AppState } from '../../state/store';
import { endUserEdit, saveUser } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';
// GSAP (Animation)
import { gsap, Power4 } from "gsap";
// Hooks
import useDisablePageScroll from './../../hooks/useDisablePageScroll';
// Utils
import { getRandomPhoto } from '../../helpers/getRandomPhoto';
// Comps
import Button from '../_ui/Button/Button';
import Input from '../_ui/Input/Input';

interface Props {

}

const UserEditModal = (props: Props) => {
    const dispatch = useDispatch();
    const toggleModal = useSelector<AppState, boolean>((state: AppState) => state.user.toggleModal);
    const clickCoords = useSelector<AppState, ClickCoords>((state: AppState) => state.user.clickCoords);

    const [prevCoords, setPrevCoords] = useState(clickCoords);

    // GSAP animation timeline
    const modalWrapRef = useRef(null)
    const modalRef = useRef(null);

    // enable/disable page scroll based on modal open/close status
    useDisablePageScroll(toggleModal);

    useEffect(() => {
        resetModalPosition(modalRef.current);
    }, [])

    useEffect(() => {
        const modalWrap = modalWrapRef.current;
        const modal = modalRef.current;

        // Open modal
        if (toggleModal === true) {
            gsap.to(modalWrap, { display: 'flex', opacity: 1, duration: 0.3, ease: Power4.easeInOut });
            gsap.from(modal, { scale: 0, left: Number(clickCoords.x), top: Number(clickCoords.y), duration: 0.4, ease: Power4.easeInOut });
            setPrevCoords(clickCoords);
            return;
        }

        // Close modal
        gsap.timeline().to(modal, {
            scale: 0, left: Number(prevCoords.x), top: Number(prevCoords.y), duration: 0.4, ease: Power4.easeInOut, onComplete: () => {
                setPrevCoords({ x: null, y: null });
            }
        })
            .to(modal, { opacity: 0, duration: 0.2, ease: Power4.easeOut }, '-=0.2')
            .to(modalWrap, {
                display: 'none', opacity: 0, duration: 0.3, ease: Power4.easeInOut, onComplete: () => {
                    // Reset/center modal position
                    resetModalPosition(modal);
                }
            }, '-=0.2');

    }, [toggleModal, clickCoords]);

    const updateUser = async () => {
        const photoUrl = await getRandomPhoto();

        const user: User = {
            id: uuidv4(),
            name: 'Joy Emad',
            address: 'Munich, Germany',
            description: 'Software Engineer',
            photoUrl: photoUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        dispatch(saveUser(user));
    }

    const closeModal = () => {
        dispatch(endUserEdit());
    }

    const resetModalPosition = (modal: HTMLLIElement | null) => {
        // Reset modal position
        gsap.set(modal, { opacity: 1, scale: 1, xPercent: -50, yPercent: -50, left: "50%", top: "50%" });
    }

    return (
        <div ref={modalWrapRef} className={`${css.userEditModal}`}>
            <form ref={modalRef} className={`${css.modal} ${css.form}`}>
                <div className={css.header}>
                    <h1>Edit user</h1>
                    <div className={css.close}>
                        <Button eClick={closeModal} ui={{ type: 'icon', size: 'small', icon: 'close', animation: 'fade', noBorder: true }} />
                    </div>
                </div>
                <div className={css.content}>
                    <div className={css.mapWrap}>
                        <div className={css.mapRatio}>
                            <div className={css.map}>Map</div>
                        </div>
                    </div>
                    <div className={css.formInputs}>
                        <Input config={{ label: 'name', placeholder: 'Mo Salah' }} />
                        <Input config={{ label: 'address', placeholder: 'Liverpool, UK' }} />
                        <Input config={{ label: 'description', placeholder: 'One of the best football players in the world' }} />
                    </div>
                </div>
                <div className={css.actions}>
                    <div className={css.btnWrap}>
                        <Button eClick={updateUser} config={{ type: 'button' }} ui={{ width: 'full' }}>Save</Button>
                    </div>
                    <div className={css.btnWrap}>
                        <Button eClick={closeModal} config={{ type: 'reset' }} ui={{ width: 'full', type: 'secondary' }}>cancel</Button>
                    </div>
                </div>
            </form>
            <div onClick={closeModal} className={css.backdrop}></div>
        </div>
    )
}

export default UserEditModal;