import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
/**
* @param {Array} headers 
* @param {Array} body
* @param {Array} buttons {className, event, name, options }
*/
export const DataTable = (props) => {
    const { headers, body, parentCallBack, buttons } = props;
    const [link, setLink] = useState("");
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [mess, setMess] = useState("");
    const [checkMode, setCheckMode] = useState("")
    useEffect(() => {
        const link = window.location.pathname;
        setLink(link);
    },[])

    const handleDeleteEvent = (id) => {
        parentCallBack(id);
    }

    const handleEvent = (id) => {
        buttons.event(id);
    }

    const handleOpenModalUpdate = () => {
        setOpenModalUpdate(true)
    }
    return (
        <>
            <Table className="serviceListTable table-head-fixed" hover bordered striped>
                <thead>
                    <tr>{headers.map(h => <th>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {body.map(data => {
                        return (
                            <tr key={data.id}>
                                {Object.keys(data).filter(d => d !== "id").map(str => data[str]).map((dt, i, array) => {
                                    return i === +0 ?
                                        <th scope="row">{dt}</th> :
                                        i === array.length - 1 ?
                                        <td className="text-center"> 
                                            {/* <Link to={`${link}/${data.id}`}> */}
                                            <Button
                                                color="primary"
                                                onClick={() => {handleOpenModalUpdate()}}
                                            >Sửa</Button> &nbsp;
                                            {/* </Link> &nbsp; */}
                                            <Button
                                                color="danger"
                                                onClick={() => handleDeleteEvent(data.id)}
                                            >Xóa</Button> &nbsp;
                                            {buttons && buttons.options? 
                                                <Button
                                                    color="primary"
                                                    onClick={() => handleEvent(data.id)}
                                                >{buttons.name}</Button> : null
                                            }
                                        </td> : <td>{dt}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalUpdate isOpen={openModalUpdate} />
        </>
    )
}