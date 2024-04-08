import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProduct, getBySearch } from './State/Product/Action';
import {
  getAllOrder,
  removeFromOrder,
  updateIsPaidById,
} from 'State/Order/Action';
import PopupModal from 'products/components/Modal/PopupModal';
import Swal from 'sweetalert2';
function App() {
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cash, setCash] = useState(0);
  const dispatch = useDispatch();
  const { products, orders } = useSelector((store) => store);
  const [modalChild, setModalChild] = useState('open');
  const [search, setSearch] = useState('');
  const addToCartShowHide = (productId) => {
    setShowModal((prevShowModal) => !prevShowModal);
    setProductId(productId);
  };

  const cashInputChange = (event) => {
    setCash(event.target.value);
  };

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  // Function to handle receiving data from the child
  const handleDataFromChild = (data) => {
    // Do something with the data received from the child
    setModalChild(data);
  };
  const removeFromOrderSubmit = (orderId) => {
    Swal.fire({
      title: 'Remove Order',
      text: 'Are you sure you want to remove this Order',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromOrder(orderId));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  const searchSubmit = () => {
    dispatch(getBySearch(search));
  };
  const handleSaveSubmit = () => {
    if (cash > totalAmount) {
      Swal.fire({
        title: 'Error',
        text: 'You must put an exact amount of cash',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {});
    }
    if (cash < totalAmount) {
      Swal.fire({
        title: 'Error',
        text: 'You must put an exact amount of cash',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {});
    } else {
      dispatch(updateIsPaidById());
      setCash(0);
      Swal.fire({
        title: 'Success',
        text: 'Successfully paid all of the orders',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then((result) => {});
    }
  };

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllOrder());
  }, [productId, modalChild, orders.order]);

  useEffect(() => {
    // Check if orders state has been updated
    if (orders?.orderList?.length > 0) {
      let sumOfOrders = 0;
      console.log('start');
      // Map over the orders and do something
      orders?.orderList?.map((order) => {
        sumOfOrders += order.Cost * order.Quantity;
        console.log('Cost:', order.Cost);
        console.log('Quantity:', order.Quantity);
        console.log('middle');
      });
      if (sumOfOrders != totalAmount) {
        setTotalAmount(sumOfOrders);
      } else {
        setTotalAmount(0);
      }
    }
  }, [orders.orderList, orders.order]);

  useEffect(() => {
    if (modalChild == 'close') {
      setShowModal((prevShowModal) => !prevShowModal);
      setModalChild('open');
    }
  }, [modalChild]);
  return (
    <div className="App">
      {showModal && (
        <PopupModal
          productId={productId}
          showModal={showModal}
          sendModalToParent={handleDataFromChild}
        />
      )}
      <div className="container mt-5">
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="searchProduct">Search Product: </label>
          </div>
          <div className="col">
            <input
              id="searchProduct"
              className="form-control"
              type="text"
              onChange={searchChange}
              value={search}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => searchSubmit()}
            >
              Search
            </button>
          </div>
        </div>

        <div className="row mb2">
          <div className="col">
            <h2>Product Table List</h2>
            <hr />
            <div className="mb-2">
              <div className="col">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.products &&
                      products?.products.map((item) => (
                        <tr key={item.ProductId}>
                          <td>{item.ProductId}</td>
                          <td>{item.ProductName}</td>
                          <td>{item.Cost}</td>
                          <td>{item.Quantity}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() => addToCartShowHide(item.ProductId)}
                            >
                              Add To Cart
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <h2>Order Table List</h2>
        <hr />
        <div className="mb-2">
          <div className="col">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.orderList &&
                  orders?.orderList.map((item) => (
                    <tr key={item.ProductId}>
                      <td>{item.ProductId}</td>
                      <td>{item.ProductName}</td>
                      <td>{item.Cost}</td>
                      <td>{item.Quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => removeFromOrderSubmit(item.OrderId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mb-2 offset-md-4">
          <div className="col">
            <label htmlFor="totalAmount">Total Amount: </label>
          </div>
          <div className="col">
            <input
              id="totalAmount"
              className="form-control"
              type="text"
              value={totalAmount}
              readOnly
            />
          </div>
          <div className="col"></div>
        </div>

        <div className="row mb-2 offset-md-4">
          <div className="col">
            <label htmlFor="cash">Cash: </label>
          </div>
          <div className="col">
            <input
              id="cash"
              className="form-control"
              type="number"
              onChange={cashInputChange}
              value={cash}
              disabled={totalAmount < 1}
            />
          </div>
          <div className="col"></div>
        </div>

        <div className="row mb-2 offset-md-4">
          <div className="col">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSaveSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
