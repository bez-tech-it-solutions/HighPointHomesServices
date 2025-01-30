import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { LuBed, LuBath, LuMapPin } from "react-icons/lu";
import { fetchApi } from "../utils/fetchApi";
import { truncateText } from "../utils/truncateText";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { objectToQueryStr } from "../utils/objectToQueryStr";
import { saveToHistory } from "../utils/saveToHistory";
import HeroSection from "../components/HeroSection/HeroSection";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import Pagination from "../components/Pagination/Pagination";

const Properties = () => {
    const [properties, setProperties] = useState(loadFromLocalStorage("properties", []));
    const [formData, setFormData] = useState(loadFromLocalStorage("filter", {}));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    console.log(JSON.stringify(formData));
    

    const fetchProperties = useCallback(async (queryParam = null, pageNumber) => {
        setLoading(true);
        setError(null);

        try {
            const path = (queryParam ? `/properties?${queryParam + "&"}` : "/properties?");
            await fetchApi({
                path:  path + `page=${pageNumber}&limit=12`,
                setLoading,
                setState: response => {
                    if (response.status === 200) {
                        const { data, pagination } = response;
                        setProperties(data || []);

                        if (queryParam) {
                            saveToHistory('search', `${JSON.stringify(formData)}`);
                        }

                        saveToLocalStorage({ properties: data });
                        setTotalPages(pagination?.totalPages || 1);
                    } else {
                        console.log(response);
                        setError("An error occurred while fetching properties. Please try again later.");
                    }
                }
            });
        } catch (err) {
            console.log(err);
            setError("Ana error occurred while fetching properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProperties(null, currentPage);
    }, [fetchProperties, currentPage]);

    const handleChange = ({target}) => setFormData({ ...formData, [target.name]: target.value });
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = event => {
        event.preventDefault();
        fetchProperties(objectToQueryStr(formData), currentPage);
    };

    const clearFilter = () => {
        fetchProperties(null, currentPage);
    }

    const renderSkeletons = (count) =>
        Array.from({ length: count }).map((_, index) => (
            <div className="col-lg-4" key={index}>
                <div className="card property-card skeleton">
                    <div className="placeholder-img"></div>
                    <div className="card-body">
                        <div className="placeholder-title"></div>
                        <div className="placeholder-text"></div>
                        <div className="placeholder-text"></div>
                    </div>
                </div>
            </div>
        ));

    const renderProperties = () =>
        properties.map((item) => (
            <div className="col-lg-4" key={item.listing_key}>
                <Link to={`/properties/${item.listing_key}`}>
                    <div className="card property-card">
                        <div className="card-img-wrapper">
                            <img
                                src={item.image_url || "/default.jpg"}
                                alt={item.json_string?.City || "Property"}
                                className="card-img-top lazyload"
                                loading="lazy"
                            />
                            <span className="badge rounded-pill text-bg-primary">
                                {item.json_string?.TransactionType || "N/A"}
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="card-title">{item.json_string?.UnparsedAddress}</h5>
                                <strong>${item.ListPrice}</strong>
                            </div>
                            <p className="card-text">{item.json_string.PropertySubType || "N/A"}</p>
                            <p className="card-text">
                                {truncateText(item.json_string?.CrossStreet || "N/A", 120)}
                            </p>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <div className="d-flex gap-1 align-items-center">
                                <LuMapPin /> <span>{item.City}</span>
                            </div>
                            {item.json_string?.PropertyType !== "Commercial" && (
                                <div className="d-flex gap-3">
                                    <div className="d-flex gap-1 align-items-center">
                                        <LuBed />{" "}
                                        <span>
                                            {item.BedroomsTotal < 10
                                                ? `0${item.BedroomsTotal}`
                                                : item.BedroomsTotal}
                                        </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                        <LuBath />{" "}
                                        <span>
                                            {item.BathroomsTotalInteger < 10
                                                ? `0${item.BathroomsTotalInteger}`
                                                : item.BathroomsTotalInteger}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        ));


    return (
        <>
            <HeroSection title="Properties" />

            <section className="mb-5">
                <div className="container">
                    <SearchFilter formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} clearFilter={clearFilter} />
                </div>
            </section>

            <section>
                <div className="container">
                    {error && (
                        <div className="alert alert-danger text-center" role="alert">{error}</div>
                    )}

                    {!loading && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}

                    <div className="row gy-5">
                        {loading ? renderSkeletons(3) : renderProperties()}
                    </div>

                    {!loading && (
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            </section>
        </>
    );
};

export default Properties;