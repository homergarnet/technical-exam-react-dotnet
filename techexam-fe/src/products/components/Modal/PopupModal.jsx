import { createOrder } from '../../../State/Order/Action';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const PopupModal = ({ productId, showModal, sendModalToParent }) => {
  const dispatch = useDispatch();

  const sendDataToParentOnClick = () => {
    // Call the function passed from the parent and pass the data as an argument
    sendModalToParent("close");
  };
  const [quantity, setQuantity] = useState(0);
  const quantityInputChange = (event) => {

    setQuantity(event.target.value);
  };

  const handleSubmit = () => {
    const reqData = {
      ProductId: productId,
      Quantity: quantity,

    };
    dispatch(createOrder(reqData));
    sendDataToParentOnClick()
  };

  return (
    <div>



      {/* Modal component */}
      <Modal show={showModal} >
        <Modal.Header >
          <Modal.Title>Add To Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* Modal content */}
          <div className="row mb-2 ">
            <div className="col">
              <label htmlFor="quantity">Quantity: </label>
            </div>
            <div className="col">
              <input
                id="quantity"
                className="form-control"
                type="number"

                onChange={quantityInputChange}
              />
            </div>
            <div className="col"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={sendDataToParentOnClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupModal;
