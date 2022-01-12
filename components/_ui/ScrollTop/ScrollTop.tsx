import React, { useState, useRef, useEffect } from 'react';
// Gsap
import { gsap, Power4 } from 'gsap';
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin.js';

gsap.registerPlugin(ScrollToPlugin);

// current page scroll hook
import useScrollPosition from './../../../hooks/useScrollPosition';

// Gsap register plugins
gsap.registerPlugin(ScrollToPlugin);

const ScrollTop = () => {
    // Current page scroll position
    let { currentPageScroll } = useScrollPosition();
    const btnRef = useRef(null);

    const onClick = () => {
        gsap.to(window, { duration: 0.8, scrollTo: 0, ease: Power4.easeInOut });
    };

    // show scroll button if user reached half of the page
    let isShowBtn = currentPageScroll > 0.9;

    return (
        // <div
        //     ref={btnRef}
        //     className={`${css.scrollToTopButton} ${isShowBtn && css.show}`}
        //     onClick={onClick}
        // >
        //     <Button type="scrollToTop">
        //         <i className={`${css.icon} ${css.iconArrowUp}`}></i>
        //     </Button>
        // </div>

        <div
            ref={btnRef}
            onClick={onClick}
        >
            <button>Scroll to top</button>
        </div>
    );
}

export default ScrollTop;
