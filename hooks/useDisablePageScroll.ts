import { useEffect } from 'react';

const useDisablePageScroll = (disable: boolean) => {
    useEffect(() => {
        if (disable) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '17px';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
    }, [disable]);
};

export default useDisablePageScroll;
