import React, { useRef, useEffect, useState } from 'react'
import css from './UserEditModal.module.scss';
// App State (Redux)
import { AppState } from '../../state/store';
import { endUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';
// GSAP (Animation)
import { gsap, Power4 } from "gsap";
// Hooks
import useDisablePageScroll from './../../hooks/useDisablePageScroll';
// Comps
import Button from '../_ui/Button/Button';
import Input from '../_ui/Input/Input';

interface Props {

}

const UserEditModal = (props: Props) => {
    const dispatch = useDispatch();
    const { toggleModal, clickCoords } = useSelector<AppState>(state => state.user);
    const [prevCoords, setPrevCoords] = useState(clickCoords);

    const timeline = useRef(); // GSAP animation timeline
    const modalWrapRef = useRef(null)
    const modalRef = useRef(null);

    // enable/disable page scroll based on modal open/close status
    useDisablePageScroll(toggleModal);

    const resetModalPosition = (modal) => {
        gsap.set(modal, { opacity: 1, scale: 1, xPercent: -50, yPercent: -50, left: "50%", top: "50%" });
    }

    useEffect(() => {
        const modalWrap = modalWrapRef.current;
        const modal = modalRef.current;

        // Open modal
        if (toggleModal === true) {
            gsap.to(modalWrap, { display: 'flex', opacity: 1, duration: 0.3, ease: Power4.easeInOut });
            gsap.from(modal, { scale: 0, left: clickCoords.x, top: clickCoords.y, duration: 0.4, ease: Power4.easeInOut });
            setPrevCoords(clickCoords);
            return;
        }

        // Close modal
        timeline.current = gsap.timeline().to(modal, {
            scale: 0, left: prevCoords.x, top: prevCoords.y, duration: 0.4, ease: Power4.easeInOut, onComplete: () => {
                setPrevCoords({ x: null, y: null });
            }
        })
            .to(modal, { opacity: 0, duration: 0.2, ease: Power4.easeOut }, '-=0.2')
            .to(modalWrap, {
                display: 'none', opacity: 0, duration: 0.3, ease: Power4.easeInOut, onComplete: () => {
                    resetModalPosition(modal);
                }
            }, '-=0.2');

    }, [toggleModal]);

    const closeModal = () => {
        dispatch(endUserEdit());
    }

    return (
        <div ref={modalWrapRef} className={`${css.userEditModal}`}>
            <div ref={modalRef} className={css.modal}>
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
                    <div className={css.form}>
                        <Input config={{ label: 'name', placeholder: 'Mo Salah' }} />
                        <Input config={{ label: 'address', placeholder: 'Liverpool, UK' }} />
                        <Input config={{ label: 'description', placeholder: 'One of the best football players in the world' }} />
                    </div>
                </div>
                <div className={css.actions}>
                    <div className={css.btnWrap}>
                        <Button ui={{ width: 'full' }}>Save</Button>
                    </div>
                    <div className={css.btnWrap}>
                        <Button eClick={closeModal} ui={{ width: 'full', type: 'secondary' }}>cancel</Button>
                    </div>
                </div>
            </div>
            <div onClick={closeModal} className={css.backdrop}></div>
        </div>
    )
}

export default UserEditModal;