/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Spinner } from "reactstrap";
import { fetchApi } from "../../utils/fetchApi";
import "./SearchFilter.css";

const SearchFilter = ({ formData, handleChange, handleSubmit, clearFilter }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            await fetchApi({
                path: "/properties?limit=100",
                setLoading,
                setState: ({status, data}) => status === 200 && setProperties(data || [])
            });
        } catch (err) {
            console.error("Error fetching properties:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const extractUniqueSorted = (key, filterFn = () => true, sortFn = (a, b) => a - b) => {
        return [...new Set(properties.map(item => item[key]).filter(filterFn))].sort(sortFn);
    };

    return (
        <div className="position-relative">
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-12">
                        <input
                            type="text"
                            name="search"
                            value={formData?.search || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Address, Street Name, or Listing #"
                        />
                    </div>
                </div>

                <div className="row">
                    {[
                        { name: "PropertySubType", label: "Property Types", values: extractUniqueSorted("PropertySubType", Boolean) },
                        { name: "minPrice", label: "Min", values: extractUniqueSorted("ListPrice") },
                        { name: "maxPrice", label: "Max", values: extractUniqueSorted("ListPrice", (p) => (formData?.minPrice ? p >= parseInt(formData.minPrice) : true)) },
                        { name: "TransactionType", label: "Transaction Type", values: ["For Sale", "For Lease"] },
                        { name: "BedroomsTotal", label: "Bed", values: extractUniqueSorted("BedroomsTotal", (b) => b > 0) },
                        { name: "BathroomsTotalInteger", label: "Bath", values: extractUniqueSorted("BathroomsTotalInteger", (b) => b > 0) },
                    ].map(({ name, label, values }) => (
                        <div key={name} className="col-6 col-lg-4 col-xl-2 mb-3">
                            <select
                                name={name}
                                value={formData?.[name] || ""}
                                className={`form-select ${loading ? "disabled" : ""}`}
                                onChange={handleChange}
                                disabled={!values.length}
                            >
                                <option value="">{label}</option>
                                {values.map((value, index) => (
                                    <option key={index} value={value}>
                                        {name.includes("Price") ? `$${value}` : value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <div className="col-6 col-lg-4 col-xl-2">
                        <button type="submit" className="btn btn-primary w-100">Search</button>
                    </div>
                    <div className="col-6 col-lg-4 col-xl-2">
                        <button type="button" onClick={clearFilter} className="btn btn-primary w-100">Clear</button>
                    </div>
                </div>
            </form>

            {loading && (
                <div className="spinner-wrapper">
                    <Spinner style={{ fontSize: "12px", width: "28px", height: "28px" }} />
                </div>
            )}
        </div>
    );
};

export default SearchFilter;