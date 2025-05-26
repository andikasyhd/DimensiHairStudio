import { FaShoppingCart } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import orderData from "../JSON/orders.json";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Orders() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedStatus: "", // Menambahkan status filter
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const _searchTerm = filters.searchTerm.toLowerCase();

  // Menyaring data order berdasarkan pencarian dan status
  const filteredOrders = orderData.filter((c) => {
    const nameMatch = c.CustomerName?.toLowerCase().includes(_searchTerm);
    const emailMatch = c.Email?.toLowerCase().includes(_searchTerm);
    const statusMatch = filters.selectedStatus
      ? c.Status === filters.selectedStatus
      : true; // Filter status

    return (nameMatch || emailMatch) && statusMatch;
  });

  // Mengambil status unik dari orderData
  const statusOptions = [...new Set(orderData.map((c) => c.Status))];

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        <div className="flex space-x-2">
          <Link to="/addorders">
            <button className="bg-kuning text-white px-4 py-2 rounded-lg">
              Add Order
            </button>
          </Link>
        </div>
      </PageHeader>

      {/* <div
        id="dashboard-grid"
        className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          id="dashboard-orders"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="orders-icon" className="bg-pink-600  rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span id="orders-count" className="text-2xl font-bold">
              75
            </span>
            <span id="orders-text" className="text-gray-400">
              Total Orders
            </span>
          </div>
        </div>
      </div> */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search by name"
        value={filters.searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Dropdown untuk filter status */}
      <select
        name="selectedStatus"
        value={filters.selectedStatus}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
  <table className="min-w-full text-sm text-gray-700">
    <thead className="bg-hijau text-white uppercase text-xs tracking-wider">
      <tr>
        <th className="p-4 text-left">Order ID</th>
        <th className="p-4 text-left">Customer Name</th>
        <th className="p-4 text-left">Status</th>
        <th className="p-4 text-left">Total Price</th>
        <th className="p-4 text-left">Order Date</th>
      </tr>
    </thead>
    <tbody>
      {currentOrders.map((c, index) => (
        <tr
          key={c.OrderID}
          className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}
        >
          <td className="p-4">{c.OrderID}</td>
          <td className="p-4">{c.CustomerName}</td>
          <td className="p-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                c.Status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : c.Status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {c.Status}
            </span>
          </td>
          <td className="p-4">Rp {c.TotalPrice.toLocaleString()}</td>
          <td className="p-4">{c.OrderDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
  {currentOrders.length === 0 && (
    <p className="text-center text-gray-500 py-6">No matching orders found.</p>
  )}
</div>


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === index + 1
                  ? "bg-green-200 text-black"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
