import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormAddCustomer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CustomerID: "",
    CustomerName: "",
    Email: "",
    Phone: "",
    Loyalty: "Bronze",
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
    console.log("Customer Submitted:", formData);
    navigate("/customers");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          🧑‍💼 Add New Customer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["CustomerID", "CustomerName", "Email", "Phone"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Loyalty Level
            </label>
            <select
              name="Loyalty"
              value={formData.Loyalty}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {["Bronze", "Silver", "Gold"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/customers")}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md transition"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
