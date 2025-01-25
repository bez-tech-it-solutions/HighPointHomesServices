/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { LuBed, LuBath, LuMapPin } from "react-icons/lu";
import { fetchApi } from "../utils/fetchApi";
import { truncateText } from "../utils/truncateText";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import HeroSection from "../components/HeroSection/HeroSection";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import Pagination from "../components/Pagination/Pagination";

const Properties = () => {
    const { search } = useLocation();
    const [properties, setProperties] = useState(loadFromLocalStorage("properties", []));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Construct the API path dynamically
    const constructApiPath = (queryParam, pageNumber, query) => {
        let queryString = "?";
        if (queryParam) queryString += `${queryParam.replace(/\?/g, "")}&`;
        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                queryString += `${key}=${value}&`;
            });
        }
        queryString += `page=${pageNumber}&limit=12`;
        return `/properties${queryString}`;
    };

    // Fetch properties from the API
    const fetchProperties = useCallback(async (queryParam, pageNumber, query) => {
        setLoading(true);
        setError(null);

        try {
            const path = constructApiPath(queryParam, pageNumber, query);
            await fetchApi({
                path,
                setLoading,
                setState: response => {
                    if (response.status === 200) {
                        const { data, pagination } = response;
                        setProperties(data || []);
                        saveToLocalStorage({ properties: data });
                        setTotalPages(pagination?.totalPages || 1);
                    } else {
                        setError("An error occurred while fetching properties. Please try again later.");
                    }
                }
            });
        } catch (err) {
            setError("An error occurred while fetching properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     setQuery(null);
    // }, [query]);

    useEffect(() => {
        fetchProperties(search, currentPage, query);
    }, [fetchProperties, search, currentPage, query]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
    };

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
                                <h5 className="card-title">{item.json_string?.PropertySubType}</h5>
                                <strong>${item.ListPrice}</strong>
                            </div>
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
                    <SearchFilter properties={properties} query={query} handleChange={handleChange} loading={loading} />
                </div>
            </section>

            <section>
                <div className="container">
                    {error && (
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
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