import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormAddOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    OrderID: "",
    CustomerName: "",
    Email: "",
    Status: "Pending",
    TotalPrice: "",
    OrderDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
    navigate("/orders");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          🧾 Add New Order
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["OrderID", "CustomerName", "Email"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                type="text"
                value={formData[field]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <input
              name="TotalPrice"
              placeholder="TotalPrice"
              type="number"
              value={formData.TotalPrice}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="OrderDate"
              placeholder="OrderDate"
              type="date"
              value={formData.OrderDate}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Order Status
            </label>
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {["Pending", "Processing", "Delivered", "Canceled"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md transition"
            >
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
