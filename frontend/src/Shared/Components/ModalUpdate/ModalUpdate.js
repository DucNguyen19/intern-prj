import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirm extends React.Component {

    render() {
        let { isOpen, data } = this.props;
        return (
            <div className="modalConfirmContainer">
                <Modal isOpen={isOpen} >
                    <ModalHeader >Chỉnh sửa thông tin:
                         {/* {ten người chỉnh sửa} */}
                    </ModalHeader>
                    <ModalBody>{data}</ModalBody>
                    <ModalFooter>
                        <Button>Yes</Button>{' '}
                        <Button color="danger">No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalConfirm;