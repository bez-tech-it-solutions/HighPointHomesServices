/* eslint-disable react/prop-types */
import { useState } from 'react'
import Search from '../../components/Search/Search';
import './SearchFilter.css';

const SearchFilter = ({ properties, query, setQuery, handleChange, loading }) => {
    const [range, setRange] = useState(null);

    const handlePriceChange = ({ target }) => setRange({ ...range, [target.name]: target.value });

    return (
        <>
            <div className="row mb-3">
                <div className="col-12">
                    <Search />
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-lg-4 col-xl-2 col-xxl-3 mb-3">
                    <select name="PropertySubType" value={query?.PropertySubType || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                        {loading ? (
                            <option>Loading...</option>
                        ) : properties.length > 0 ? (
                            <>
                                <option defaultValue>Property Types</option>
                                {[...new Set(properties.map(item => item.PropertySubType))].sort((a, b) => a.localeCompare(b)).map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </>
                        ) : (
                            <option>No Property Found</option>
                        )}
                    </select>
                </div>

                <div className="col-6 col-lg-4 col-xl-2 mb-3">
                    <div className="dropdown price-range">
                        <button type="button" className="btn w-100 dropdown-toggle" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Price Range
                        </button>
                        <div className="dropdown-menu px-3" aria-labelledby="triggerId">
                            <div className="row mb-3">
                                <div className="col-6">
                                    <select name="minPrice" value={range?.minPrice || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handlePriceChange}>
                                        {loading ? (
                                            <option>Loading...</option>
                                        ) : properties.length > 0 ? (
                                            <>
                                                <option>Min</option>
                                                {[...new Set(properties.map(item => item.ListPrice))].sort((a, b) => a - b).map((price, index) => (
                                                    <option key={index} value={price}>{`$${price}`}</option>
                                                ))}
                                            </>
                                        ) : (
                                            <option>No Property Found</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <select name="maxPrice" value={range?.maxPrice || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handlePriceChange}>
                                        {loading ? (
                                            <option>Loading...</option>
                                        ) : properties.length > 0 ? (
                                            <>
                                                <option>Max</option>
                                                {[...new Set(properties.map(item => item.ListPrice).filter(price => !range?.minPrice || price >= range.minPrice))].sort((a, b) => a - b).map((price, index) => (
                                                    <option key={index} value={price}>{`$${price}`}</option>
                                                ))}
                                            </>
                                        ) : (
                                            <option>No Property Found</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <button type='button' className="btn btn-primary" onClick={() => setQuery({ ...query, ...range })}>Filter</button>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-lg-4 col-xl-2 mb-3">
                    <select name="TransactionType" value={query?.TransactionType || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                        {loading ? (
                            <option>Loading...</option>
                        ) : properties.length > 0 ? (
                            <>
                                <option defaultValue>Transaction Type</option>
                                <option value="For Lease">For Lease</option>
                                <option value="For Sale">For Sale</option>
                            </>
                        ) : (
                            <option>No Property Found</option>
                        )}
                    </select>
                </div>

                <div className="col-6 col-lg-4 col-xl-2 mb-3">
                    <select name="BedroomsTotal" disabled={properties.some(item => item.BedroomsTotal > 0) ? "" : "disabled"} value={query?.BedroomsTotal || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                        {loading ? (
                            <option>Loading...</option>
                        ) : properties.length > 0 ? (
                            <>
                                <option defaultValue>Bedrooms</option>
                                {[...new Set(
                                    properties.map(item => item.BedroomsTotal).filter(value => value && value > 0)
                                )].sort((a, b) => a - b).map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </>
                        ) : (
                            <option>No Property Found</option>
                        )}
                    </select>
                </div>

                <div className="col-6 col-lg-4 col-xl-2 mb-3">
                    <select name="BathroomsTotalInteger" disabled={properties.some(item => item.BathroomsTotalInteger > 0) ? "" : "disabled"} value={query?.BathroomsTotalInteger || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                        {loading ? (
                            <option>Loading...</option>
                        ) : properties.length > 0 ? (
                            <>
                                <option defaultValue>Bathrooms</option>
                                {[...new Set(
                                    properties.map(item => item.BathroomsTotalInteger).filter(value => value && value > 0)
                                )].sort((a, b) => a - b).map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </>
                        ) : (
                            <option>No Property Found</option>
                        )}
                    </select>
                </div>

                <div className="col-6 col-lg-4 col-xl-2 col-xxl-1 mb-3">
                    <button type='button' className="btn btn-primary clear w-100" onClick={() => { setQuery(null); setRange(null) }}>Clear</button>
                </div>
            </div>
        </>
    );
}

export default SearchFilter