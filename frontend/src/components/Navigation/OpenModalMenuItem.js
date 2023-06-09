import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
    modalComponent,
    itemText,
    onItemClick,
    onModalClose
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <li
            style={{ cursor: "pointer", listStyleType: "none" }}
            onClick={onClick}>{itemText}</li>
    );
}

export default OpenModalMenuItem;
