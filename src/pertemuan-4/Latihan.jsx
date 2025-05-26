import latihanData from "./latihan.json";
import { useState } from "react";
export default function Latihan() {
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedTag: "",
    });

    // Handle perubahan nilai input form
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const _searchTerm = dataForm.searchTerm.toLowerCase();

    const filteredProducts = latihanData.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(_searchTerm) ||
            product.description.toLowerCase().includes(_searchTerm);

        const matchesTag = dataForm.selectedTag
            ? product.tags.includes(dataForm.selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    const allTags = [...new Set(latihanData.flatMap((product) => product.tags))];
    return (
        <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

        <input
            type="text"
            name="searchTerm"
            placeholder="Search product..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={handleChange}
        />

        <select
            name="selectedTag"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={handleChange}
        >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
                <option key={index} value={tag}>
                    {tag}
                </option>
            ))}
        </select>
        <div className="grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 ">
            <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="p-4 border rounded-2xl shadow-lg bg-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">{product.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <span className="text-yellow-400">⭐</span>
                                <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                            <p className="text-lg font-bold mt-2 text-blue-500">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                            <p className="text-gray-500 text-sm line-through">${product.price.toFixed(2)}</p>
                            <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                        </div>
                        <button className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
