import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const Filters = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Ensures that DatePicker only renders on the client
    }, []);

    const categories = [
        { value: "electronics", label: "Electronics" },
        { value: "clothing", label: "Clothing" },
        { value: "clothing2", label: "Clothing" },
        { value: "clothing21", label: "Clothing" },
        { value: "clothing212", label: "Clothing" },
        { value: "clothing212e", label: "Clothing" },

        { value: "home_appliances", label: "Home Appliances" }
    ];

    const subCategories = [
        { value: "mobile", label: "Mobile Phones" },
        { value: "laptop", label: "Laptops" },
        { value: "tshirt", label: "T-Shirts" }
    ];

    const products = [
        { value: "iphone", label: "iPhone 14" },
        { value: "macbook", label: "MacBook Air" },
        { value: "samsung_tv", label: "Samsung 55\" TV" }
    ];


    const customStyles = {
        multiValue: (provided) => ({
            ...provided,
            display: "inline-flex", // Keeps the items in a single line
        }),
        multiValueContainer: (provided) => ({
            ...provided,
            overflowX: "auto", // Enables horizontal scrolling
            whiteSpace: "nowrap",
            maxWidth: "100%",
        }),

        valueContainer: (provided) => ({
            ...provided,
            display: "flex",
            flexWrap: "nowrap", // Prevents wrapping into new lines
            overflowX: "auto",
            maxWidth: "100%",
        }),
        control: (provided, state) => ({
            ...provided,
            borderWidth: "1px",
            overflowX: "auto",
            display: "flex",
            whiteSpace: "nowrap",
            borderColor: state.isFocused ? "#0136f8" : "#bfbfbf", // Blue border on focus
            // boxShadow: state.isFocused ? "0 0 5px rgba(74, 144, 226, 0.5)" : "none",
            "&:hover": {
                borderColor: "#0136f8",
            },
            borderRadius: "8px", // Rounded corners
            padding: "2px",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#6B7280", // Custom placeholder color (gray-500)
            fontWeight: "500",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#4A90E2", // Change dropdown arrow color
            "&:hover": {
                color: "#1E40AF",
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#F3F4F6", // Light gray background
            borderRadius: "8px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#4A90E2" : state.isFocused ? "#E5E7EB" : "white",
            color: state.isSelected ? "white" : "black",
            "&:hover": {
                backgroundColor: "#E5E7EB",
                color: "black",
            },
        }),
    };

    const handleSubmit = () => {
        const selectedCategoryValues = selectedCategories.map(category => category.value);
        console.log("Filters Applied:", { startDate, endDate, selectedCategories: selectedCategoryValues });
    };

    if (!mounted) return null; // Avoid hydration mismatch by ensuring client-side render

    return (
        <div className="bg-gray-200 rounded-lg mt-8 p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-m">
                {/* Start Date Picker */}
                <div className="flex flex-col gap-xs">
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="border rounded-md p-2 w-full border-effect "
                        placeholderText="Select start date and time"
                    />
                </div>

                {/* End Date Picker */}
                <div className="flex flex-col gap-xs">
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="border rounded-md p-2 w-full border-effect "
                        placeholderText="Select end date and time"
                    />
                </div>

                {/* Categories Dropdown */}
                <div className="flex flex-col gap-xs">
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <Select
                        options={categories}
                        isMulti
                        value={selectedCategories}
                        onChange={setSelectedCategories}
                        placeholder="Select categories"
                        styles={customStyles}
                    />
                </div>

                <div className="flex flex-col gap-xs">
                    <label className="block text-sm font-medium text-gray-700">Subcategories</label>
                    <Select
                        options={subCategories}
                        isMulti
                        value={selectedSubCategories}
                        onChange={setSelectedSubCategories}
                        placeholder="Select subcategories"
                        styles={customStyles}
                    />
                </div>

                <div className="flex flex-col gap-xs">
                    <label className="block text-sm font-medium text-gray-700">Products</label>
                    <Select
                        options={products}
                        isMulti
                        value={selectedProducts}
                        onChange={setSelectedProducts}
                        placeholder="Select products"
                        styles={customStyles}
                    />
                </div>

            </div>

            {/* Submit Button */}
            <div className="mt-4 flex items-center justify-end">
                <button
                    onClick={handleSubmit}
                    className="default-button transition duration-200"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default Filters;
