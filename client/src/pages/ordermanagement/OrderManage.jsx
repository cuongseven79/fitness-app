import React, { useState, useEffect } from 'react';
import { getOrder } from "../../api/orderService";
import UserDefaultImage from "../../images/user_profile.png";
import './orderManagement.css';

const ManageOrders = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = () => {
    
    const filterStartDate = startDate ? new Date(startDate) : null;
    const filterEndDate = endDate ? new Date(endDate) : null;

    const filteredOrders = allOrders.filter(order => {
      const orderTimestamp = order.date._seconds * 1000; // Convert to milliseconds

      if (filterStartDate && orderTimestamp < filterStartDate.getTime()) {
        return false;
      }

      if (filterEndDate && orderTimestamp > filterEndDate.getTime()) {
        return false;
      }

      return true;
    });

    setFilteredOrders(filteredOrders);
    setCurrentPage(1);
  };

  const totalMoney = filteredOrders.reduce((total, order) => total + parseFloat(order.paid_money), 0);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const fetchOrders = async () => {
    try {
      const { statusCode, ordersData } = await getOrder();
      if (ordersData && statusCode === 200) {
        setAllOrders(ordersData);
        setFilteredOrders(ordersData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredOrders(allOrders);
    setCurrentPage(1);
  };


  useEffect(() => {
    document.title = 'Admin Page: Manage Orders';
    fetchOrders();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  
  

  return (
    <section>
      <span className='font'>Manage Orders</span>
      <div className="container">
        <div className="date-filter">
          <div className="margin-right-50">
            <label>From: </label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>

          <div className="margin-right-50">
            <label>To: </label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>

          <button className="button" onClick={handleFilter}>
  Filter
</button>
<button className="button" onClick={handleResetFilter}>
            Reset Filter
          </button>
        </div>

        <div className="total-money">
        <p><span>Total Money:</span> $ {totalMoney.toFixed(2)}</p>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Display Name</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Service Type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Paid Money</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, index) => (
              <tr key={order.orderId}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                {order.displayName}
                </td>
                <td>{new Date(order.date._seconds * 1000).toLocaleDateString()}</td>
                <td>{order.orderId}</td>
                <td>{order.service_type}</td>
                <td>{new Date(order.start_time._seconds * 1000).toLocaleDateString()}</td>
                <td>{new Date(order.end_time._seconds * 1000).toLocaleDateString()}</td>
                <td>{order.paid_money}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {visiblePageNumbers.map(pageNumber => (
            <button
              key={pageNumber}
              className={`pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ManageOrders;
