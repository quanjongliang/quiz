import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@mui/material/Dialog';

export interface IDataUI {
    id?: string;
    type?: string;
    content: any;
    configModal?: {
        [key: string]: number | string;
    };
}

interface IProps {}

interface IStates {
    popups: IDataUI[];
}

let modalManagerInstance: ModalManager | undefined;

class ModalManager extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        modalManagerInstance = this;
        this.state = {
            popups: []
        };
    }

    static get instance() {
        return modalManagerInstance;
    }

    showModal = (item: any) => {
        const { popups } = this.state;
        const newPopups = [...popups, { ...item, id: uuidv4() }];
        this.setState({ popups: newPopups });
    };

    closeModal = (item: IDataUI) => {
        const { popups } = this.state;
        const newData = popups.filter((popup) => popup.id !== item.id);
        this.setState({ popups: newData });
    };

    render() {
        const { popups } = this.state;
        return (
            <>
                {popups.map((popup: IDataUI) => {
                    return (
                        <Dialog onClose={() => this.closeModal(popup)} open key={popup.id}>
                            {popup.content(() => this.closeModal(popup))}
                        </Dialog>
                    );
                })}
            </>
        );
    }
}

export default ModalManager;
