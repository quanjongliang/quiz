import React from 'react';
import ModalManager, { IDataUI } from './ModalManager';

class ControllerUI {
    showModal = (item: IDataUI) => {
        ModalManager.instance?.showModal(item);
    };
}

const UIManager = new ControllerUI();

export default UIManager;

export function ViewUIManager() {
    return (
        <>
            <ModalManager />
        </>
    );
}
