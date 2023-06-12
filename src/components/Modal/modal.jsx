import { useEffect } from 'react';
import { Overlay, ModalImg } from '../Modal/moldal.styled';

export default function ModalOverlay({onClick, largeImageURL}) {
    const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
        onClick();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    })


    const handleClick = (e) => {
    if (e.target === e.currentTarget) {
        onClick();
    }
};
    return (
    <Overlay onClick={handleClick}>
        <ModalImg>
            <img src={largeImageURL} alt="" />
        </ModalImg>
    </Overlay>
    );
}