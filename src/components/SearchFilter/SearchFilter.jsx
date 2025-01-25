/* eslint-disable react/prop-types */
import Search from '../../components/Search/Search';
import './SearchFilter.css';

const SearchFilter = ({ properties, query, handleChange, loading }) => {
    return (
        <div className="row">
            <div className="col-4 col-lg-4 mb-3 mb-lg-0">
                <Search />
            </div>

            <div className="col-6 col-lg-2">
                <select name="PropertySubType" value={query?.PropertySubType || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                    {loading ? (
                        <option>Loading...</option>
                    ) : properties.length > 0 ? (
                        <>
                            <option defaultValue>Property Types</option>
                            {[...new Set(properties.map(item => item.PropertySubType))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </>
                    ) : (
                        <option value="">No Property Found</option>
                    )}
                </select>
            </div>

            <div className="col-6 col-lg-2">
                <select name="City" value={query?.City || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                    {loading ? (
                        <option>Loading...</option>
                    ) : properties.length > 0 ? (
                        <>
                            <option defaultValue>Cities</option>
                            {[...new Set(properties.map(item => item.City))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </>
                    ) : (
                        <option value="">No Property Found</option>
                    )}
                </select>
            </div>

            {/* <div className="col-6 col-lg-2">
                <select name="TransactionType" value={query?.TransactionType || ""} className={`form-select ${loading ? "disabled" : ""}`} onChange={handleChange}>
                    {loading ? (
                        <option>Loading...</option>
                    ) : properties.length > 0 ? (
                        [...new Set(properties.map(item => item.TransactionType))].map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))
                    ) : (
                        <option value="">No Property Found</option>
                    )}
                </select>
            </div> */}

            <div className="col-6 col-lg-2">
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
                        <option value="">No Property Found</option>
                    )}
                </select>
            </div>

            <div className="col-6 col-lg-2">
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
                        <option value="">No Property Found</option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default SearchFilter