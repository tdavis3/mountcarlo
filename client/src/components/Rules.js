import React, {useState} from 'react';
import './Rules.css';
import Modal from 'react-modal';
import {Button} from "rebass";


const Rules = () => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    return (
        <div className="Rules">
            <Button className="button-link" onClick={openModal}>Rules</Button>
            <Modal isOpen={open} onRequestClose={closeModal}>
                <h2>Rules</h2>
                <ul>
                    <li>Your bid must be strictly greater than (0.001 ether + Previous Bid).</li>
                    <li>The clock increases 3 minutes after every bid.</li>
                    <li>The clock can be increased up to a max of 24 hours.</li>
                    <li>Anyone is able to drain the contract after the clock runs out.</li>
                </ul>
            </Modal>
        </div>
    );
}

export default Rules;
