import React, { useRef, useEffect, useState } from 'react'
import css from './UserEditModal.module.scss';

// App State (Redux)
import { AppState } from '../../state/store';
import { endUserEdit } from '../../state/userAction';
import { useSelector, useDispatch } from 'react-redux';

// GSAP - Animation
import { gsap, Power4 } from "gsap";

// Hooks
import useDisablePageScroll from './../../hooks/useDisablePageScroll';

interface Props {

}

const UserEditModal = (props: Props) => {
    const dispatch = useDispatch();
    const { toggleModal, clickCoords } = useSelector<AppState>(state => state.user);
    const [prevCoords, setPrevCoords] = useState(clickCoords);

    const timeline = useRef(); // GSAP animation timeline
    const modalWrapRef = useRef(null);
    const modalRef = useRef(null);

    // enable/disable page scroll based on modal open/close status
    useDisablePageScroll(toggleModal);

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
                gsap.to(modalWrap, {
                    display: 'none', opacity: 0, duration: 0.3, ease: Power4.easeInOut, onComplete: () => {
                        gsap.set(modal, { opacity: 1, scale: 1, xPercent: -50, yPercent: -50, left: "50%", top: "50%" });
                    }
                });
            }
        }).to(modal, { opacity: 0, duration: 0.2, ease: Power4.easeOut }, '-=0.2');

    }, [toggleModal]);

    const closeModal = () => {
        dispatch(endUserEdit());
    }

    return (
        <div ref={modalWrapRef} className={`${css.userEditModal}`}>
            <div ref={modalRef} className={css.modal}>
                <div className={css.header}>Header | <span onClick={closeModal}>Close</span></div>
                <div className={css.content}>
                    Content
                </div>
                <div className={css.footer}>Footer</div>
            </div>
            <div onClick={closeModal} className={css.backdrop}></div>
        </div>
    )
}

export default UserEditModal;