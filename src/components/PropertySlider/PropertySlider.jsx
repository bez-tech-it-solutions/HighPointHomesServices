/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { LuBed, LuBath } from "react-icons/lu";
import { fetchApi } from "../../utils/fetchApi";
import { truncateText } from "../../utils/truncateText";
import { objectToQueryStr } from "../../utils/objectToQueryStr";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PropertySlider.css";


const PropertySlider = ({ params = null, slidesToShow, slidesToScroll, dots }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const settings = {
        dots: dots || false,
        infinite: true,
        speed: 800,
        pauseOnHover: true,
        slidesToShow,
        slidesToScroll,
        lazyLoad: "ondemand", // Enables lazy loading
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    const fetchProperties = useCallback(async () => {
        setLoading(true);

        const queryStr = objectToQueryStr(params);
        const path = queryStr ? `/properties?${queryStr}&` : "/properties";
        await fetchApi({
            path: `${path}limit=10`,
            setLoading,
            setState: (response) => setProperties(response.data || []),
        });
    }, [params]);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const renderSkeletons = (count) => (
        Array.from({ length: count }).map((_, index) => (
            <div className="col-lg-4 mb-4 mb-lg-0" key={index}>
                <div className="card property-card skeleton">
                    <div className="placeholder-img"></div>
                    <div className="card-body">
                        <div className="placeholder-title"></div>
                        <div className="placeholder-text"></div>
                        <div className="placeholder-text"></div>
                    </div>
                </div>
            </div>
        ))
    );

    const renderProperties = () => (
        properties.map((item, index) => (
            <Link to={`/properties/${item.listing_key}`} key={index}>
                <div className="card shadow">
                    <div className="card-img-wrapper">
                        <img
                            src={item.image_url || "/default.jpg"}
                            alt={item.json_string.City || "Property"}
                            className="card-img-top lazyload"
                        />
                        <span className="badge rounded-pill text-bg-primary">
                            {item.json_string.TransactionType || "N/A"}
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="card-title">{item.json_string.UnparsedAddress}</h5>
                            <strong>${item.ListPrice}</strong>
                        </div>
                        <p className="card-text">{item.json_string.PropertySubType || "N/A"}</p>
                        <p className="card-text">{truncateText(item.json_string.CrossStreet || "N/A", 120)}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <span className="city">{item.City}</span>
                        {item.json_string.PropertyType !== "Commercial" && (
                            <div className="d-flex gap-3">
                                <div className="d-flex gap-1 align-items-center">
                                    <LuBed /> {item.BedroomsTotal < 10 ? `0${item.BedroomsTotal}` : item.BedroomsTotal}
                                </div>
                                <div className="d-flex gap-1 align-items-center">
                                    <LuBath /> {item.BathroomsTotalInteger < 10 ? `0${item.BathroomsTotalInteger}` : item.BathroomsTotalInteger}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        ))
    );

    return (
        <>
            {loading ? (
                <div className="row">{renderSkeletons(3)}</div>
            ) : properties.length > 0 ? (
                <Slider {...settings}>{renderProperties()}</Slider>
            ) : (
                <h4>No properties available.</h4>
            )}
        </>
    );
};

export default PropertySlider;