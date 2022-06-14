import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { deleteShop, editShop } from "../actions";

const ShopCard = (props) => {
    const [addName, setAddName] = useState("");
    const [addArea, setAddArea] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addOpenDate, setAddOpenDate] = useState("");
    const [addCloseDate, setAddCloseDate] = useState("");
    const [dateWarning, setDateWarning] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let current = new Date();
    let open = new Date(props.opening);
    let close = new Date(props.closing);
    const dispatch = useDispatch();
    const deleteHandler = () => {
        dispatch(deleteShop(props.id));
    }
    const handleClick = (event) => {
        event.preventDefault();
        let obj = {
            name: addName,
            area: addArea,
            category: addCategory,
            opening: addOpenDate,
            closing: addCloseDate
        }
        if (addCloseDate < addOpenDate) {
            setDateWarning(true);
        } else {
            setDateWarning(false);
            dispatch(editShop(props.id, obj));
            handleClose();
            setAddName("");
            setAddArea("");
            setAddCategory("");
            setAddCloseDate("");
            setAddOpenDate("");
        }
    }
    return (
        <>
            <Card style={{ width: '18rem', margin: "10px" }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{`${props.category}, ${props.area}`}</Card.Subtitle>
                    {current >= open && current <= close ? (
                        <Card.Text>
                            <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
                            <span className="mx-1">Open</span>
                        </Card.Text>
                    ) : (
                        <Card.Text>
                            <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />
                            <span className="mx-1">Closed</span>
                        </Card.Text>
                    )}
                </Card.Body>
                <Card.Text className="d-flex justify-content-between border-top py-2">
                    <span style={{ borderRight: "2px solid lightgrey" }} className="text-center w-50">
                        <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} style={{ cursor: "pointer" }} className="text-secondary" />
                    </span>
                    <span className="text-center w-50">
                        <FontAwesomeIcon onClick={deleteHandler} icon={faTrash} style={{ cursor: "pointer" }} className="text-danger" />
                    </span>
                </Card.Text>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Shop Details</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleClick}>
                    <Modal.Body>
                        <label>Shop Name</label><br />
                        <input className="form-control" value={addName} pattern="[A-Za-z]{2,}" onChange={(e) => setAddName(e.target.value)} required={true} />
                        <p className="text-danger" style={{ fontSize: "14px" }}>*Requested Format: Alphabets only with atleast 2 letters!</p>
                        <div className="d-flex justify-content-evenly flex-wrap">
                            <select defaultValue={addArea} onChange={(e) => setAddArea(e.target.value)} required={true} className="mt-3 p-2">
                                <option value="" disabled>Area</option>
                                <option value="Thane">Thane</option>
                                <option value="Pune">Pune</option>
                                <option value="Mumbai Suburban">Mumbai Suburban</option>
                                <option value="Nashik">Nashik</option>
                                <option value="Nagpur">Nagpur</option>
                                <option value="Ahmednagar">Ahmednagar</option>
                                <option value="Solapur">Solapur</option>
                            </select>
                            <select required={true} defaultValue={addCategory} onChange={(e) => setAddCategory(e.target.value)} className="mt-3 p-2">
                                <option value="" disabled>Category</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Butcher">Butcher</option>
                                <option value="Baker">Baker</option>
                                <option value="Chemist">Chemist</option>
                                <option value="Stationery">Stationery Shop</option>
                            </select>
                        </div>
                        <div className="mt-2">
                            <label>Opening Date</label>
                            <input required={true} type="date" value={addOpenDate} onChange={(e) => setAddOpenDate(e.target.value)} className="form-control" />
                            <label>Closing Date</label>
                            <input required={true} type="date" value={addCloseDate} onChange={(e) => setAddCloseDate(e.target.value)} className="form-control" />
                            {dateWarning ? (<p className="text-danger mt-2">*Closing Date cannot be before the Opening Date!</p>) : null}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Edit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
export default ShopCard;