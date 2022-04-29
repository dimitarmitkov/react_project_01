import { Button } from 'primereact/button';
import { useState } from 'react';
import './scrollButton.css';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <>
            {visible ?
                <Button onClick={scrollToTop} className="scroll-up-button" icon="pi pi-caret-up" />
                : null}
        </>

    );
}

export default ScrollButton;