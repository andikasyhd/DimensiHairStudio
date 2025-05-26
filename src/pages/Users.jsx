import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader"; // Pastikan kamu punya komponen PageHeader
import { IoIosPeople } from "react-icons/io";
import Loading from "../components/Loading";

// User data fetch URL
const USERS_API = "https://dummyjson.com/users";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Limit data per page
  const [totalPages] = useState(3); // Only show up to 3 pages

  useEffect(() => {
    // Fetching the user data from the API
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(USERS_API);
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle input changes (search term)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle page change for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter users based on search term
  const filteredUsers = users
    .filter((user) => {
      const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
      const matchesSearchTerm =
        user.id.toString().includes(lowerCaseSearchTerm) || // Match by User ID
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) || // Match by First Name
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm) || // Match by Last Name
        user.email.toLowerCase().includes(lowerCaseSearchTerm) || // Match by Email
        user.phone.toLowerCase().includes(lowerCaseSearchTerm); // Match by Phone
      return matchesSearchTerm;
    })
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  if (loading) {
    return <div className="text-center"><Loading/></div>;
  }

  return (
    <div>
      <PageHeader title="Users" breadcrumb={["Dashboard", "User List"]}>
        <div className="flex space-x-2">
          <Link to="/adduser">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Add User
            </button>
          </Link>
        </div>
      </PageHeader>

      {/* Search Input */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search by ID, name, email, or phone"
        value={filters.searchTerm}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-green-500 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-gray-100"
                }
              >
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.firstName} {user.lastName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-6">No matching users found.</p>
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
                currentPage === index + 1 ? "bg-green-200 text-black" : "bg-white"
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
