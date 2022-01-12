import { useEffect, useState } from 'react';

const useScrollPosition = () => {
    const [currentPageScroll, setCurrentPageScroll] = useState(0);
    const [scrollHeight, setScrollHeight] = useState<number>(0);

    useEffect(() => {
        let { hightToScroll } = getHeight();
        setScrollHeight(hightToScroll);

        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        };
    }, []);

    const listenToScroll = () => {
        let { winScroll, hightToScroll } = getHeight();
        let scrollValue = winScroll / hightToScroll;
        // Set page height
        setScrollHeight(hightToScroll);
        // Set scroll position
        setCurrentPageScroll(scrollValue);
    };

    const getHeight = () => {
        const body = document.body;
        const doc = document.documentElement;

        let winScroll = body.scrollTop || doc.scrollTop;
        let hightToScroll = doc.scrollHeight - doc.clientHeight;

        return { winScroll, hightToScroll };
    };

    return { currentPageScroll, scrollHeight };
};

export default useScrollPosition;
