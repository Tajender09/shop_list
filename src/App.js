import React, { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import ShopCard from "./Components/ShopCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { addShop, filterArea, filterCategory, filterStatus } from "./actions";

function App() {
  // const [shops, setShops] = useState();

  const [addName, setAddName] = useState("");
  const [addArea, setAddArea] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addOpenDate, setAddOpenDate] = useState("");
  const [addCloseDate, setAddCloseDate] = useState("");
  const [dateWarning, setDateWarning] = useState(false);
  const [filters, showFilters] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shopList);
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
      dispatch(addShop(obj));
      handleClose();
      setAddName("");
      setAddArea("");
      setAddCategory("");
      setAddArea("");
      setAddCloseDate("");
      setAddOpenDate("");
    }
  }
  return (
    <Container className="d-flex flex-column align-items-center">
      <div className="my-3">
        <Button className="mx-2" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add a Shop</Button>
        <Button onClick={()=> showFilters(!filters)} className="mx-2"><FontAwesomeIcon icon={faFilter} /> Filters</Button>
      </div>
      {filters ? (
        <div className="d-flex justify-content-center flex-wrap">
          <select defaultValue="area" onChange={(e)=> dispatch(filterArea(e.target.value))} className="my-1 mx-3 p-2">
            <option value="area" disabled>Area</option>
            <option value="Thane">Thane</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai Suburban">Mumbai Suburban</option>
            <option value="Nashik">Nashik</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Ahmednagar">Ahmednagar</option>
            <option value="Solapur">Solapur</option>
          </select>
          <select defaultValue="category" onChange={(e)=> dispatch(filterCategory(e.target.value))} className="my-1 mx-3 p-2">
            <option value="category" disabled>Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Butcher">Butcher</option>
            <option value="Baker">Baker</option>
            <option value="Chemist">Chemist</option>
            <option value="Stationery">Stationery Shop</option>
          </select>
          <select defaultValue="status" onChange={(e)=> dispatch(filterStatus(e.target.value))} className="my-1 mx-3 p-2">
            <option value="status" disabled>Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      ) : null}
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {shops.map((item, index) => {
          return (
            <ShopCard key={index} id={index} name={item.name} area={item.area} category={item.category} opening={item.opening} closing={item.closing} />
          )
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Shop</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleClick}>
          <Modal.Body>
            <label>Shop Name</label><br />
            <input className="form-control" value={addName} pattern="[A-Za-z]{2,}" onChange={(e) => setAddName(e.target.value)} required={true} />
            <p className="text-danger" style={{fontSize: "14px"}}>*Requested Format: Alphabets only with atleast 2 letters!</p>
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
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
}

export default App;
