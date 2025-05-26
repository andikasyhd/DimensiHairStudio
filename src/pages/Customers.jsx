import { IoIosPeople } from "react-icons/io";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customerData from "../JSON/customers.json";

export default function Customers() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedLoyalty: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle filter change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const _searchTerm = filters.searchTerm.toLowerCase();
  const loyaltyOptions = [...new Set(customerData.map((c) => c.Loyalty))];

  // Filter the customers based on search term and selected loyalty
  const filteredCustomers = customerData.filter((c) => {
    const nameMatch = c.CustomerName?.toLowerCase().includes(_searchTerm);
    const emailMatch = c.Email?.toLowerCase().includes(_searchTerm);
    const loyaltyMatch = filters.selectedLoyalty
      ? c.Loyalty === filters.selectedLoyalty
      : true;

    return (nameMatch || emailMatch) && loyaltyMatch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  return (
    <div>
      <PageHeader title="Customer" breadcrumb={["Dashboard", "Customer List"]}>
        <div className="flex space-x-2">
          <Link to="/addcust">
            <button className="bg-hijau text-white px-4 py-2 rounded-lg">
              Add Customer
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
          <div id="orders-icon" className="bg-hijau rounded-full p-4">
            <IoIosPeople className="text-3xl text-white" />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span id="orders-count" className="text-2xl font-bold">
              200
            </span>
            <span id="orders-text" className="text-gray-400">
              Total Customer
            </span>
          </div>
        </div>
      </div> */}
      {/* Search Input */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search by name or email"
        value={filters.searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Loyalty Filter */}
      <select
        name="selectedLoyalty"
        value={filters.selectedLoyalty}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Loyalty Levels</option>
        {loyaltyOptions.map((loyalty) => (
          <option key={loyalty} value={loyalty}>
            {loyalty}
          </option>
        ))}
      </select>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
  <table className="min-w-full text-sm text-gray-700">
    <thead className="bg-hijau text-white uppercase text-xs tracking-wider">
      <tr>
        <th className="p-4 text-left">Customer ID</th>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">Email</th>
        <th className="p-4 text-left">Phone</th>
        <th className="p-4 text-left">Loyalty</th>
      </tr>
    </thead>
    <tbody>
      {currentCustomers.map((c, index) => (
        <tr
          key={c.CustomerID}
          className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"}
        >
          <td className="p-4">{c.CustomerID}</td>
          <td className="p-4">{c.CustomerName}</td>
          <td className="p-4">{c.Email}</td>
          <td className="p-4">{c.Phone}</td>
          <td className="p-4">{c.Loyalty}</td>
        </tr>
      ))}
    </tbody>
  </table>
  {currentCustomers.length === 0 && (
    <p className="text-center text-gray-500 py-6">No matching customers found.</p>
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
