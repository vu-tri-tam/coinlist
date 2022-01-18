import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import QRcode from './QRcode';

export default function ModalQRcode({ show, handleShowQR }) {
    // const [users, setUsers] = useState([]);

    return (
        <div>
            <Modal
                show={show}
                onHide={handleShowQR}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <QRcode />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}
