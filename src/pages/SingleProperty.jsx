/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams } from 'react-router-dom';
import { LuMapPin } from 'react-icons/lu';
import { FaSquareCheck } from "react-icons/fa6";
import { fetchApi } from '../utils/fetchApi';
import { loadFromLocalStorage } from '../utils/localStorage'
import { saveToHistory } from '../utils/saveToHistory'
import Slider from "react-slick";
import PropertySlider from '../components/PropertySlider/PropertySlider';
import LoginModal from '../components/LoginModal/LoginModal'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const SkeletonLoader = ({ count, type }) => {
    const placeholders = Array.from({ length: count });

    return (
        <div className="skeleton-loader">
            {placeholders.map((_, index) => (
                <div className={`skeleton-${type}`} key={index}>
                    <div className="skeleton-img"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                </div>
            ))}
        </div>
    );
};

export const ErrorBoundary = ({ message, children }) => (
    <div className="error-boundary text-center py-4">
        <h4 className="text-danger">{message}</h4>
        {children}
    </div>
);

const SingleProperty = () => {
    const { listingKey } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(loadFromLocalStorage('profile', null));

    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: "ondemand", // Enables lazy loading
    };

    const fetchProperty = useCallback(async () => {
        if (!listingKey) return;

        setLoading(true);
        setError(null);

        try {
            await fetchApi({
                path: `/properties?listing_key=${listingKey}`,
                setLoading,
                setState: (response) => setProperty(response.data),
            });
        } catch {
            setError('Failed to fetch property. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [listingKey]);

    useEffect(() => {
        fetchProperty();
        saveToHistory('property', listingKey);
    }, [fetchProperty, listingKey]);

    if (loading) {
        return (
            <div className="container py-4">Loading...</div>
        );
    }

    if (error) {
        return (
            <ErrorBoundary message={error}>
                <button className="btn btn-primary" onClick={fetchProperty}>
                    Retry
                </button>
            </ErrorBoundary>
        );
    }


    return (
        <>
            <Helmet>
                <title>Canadian Homes for Sale & rent | 4 Your House Listings</title>
                <meta name="description" content="Explore diverse properties for sale and rent in Canada. Find your dream home with 4 Your House." />
            </Helmet>

            <div className="property-details">
                <section className="main-info py-4">
                    <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
                        <h1 className="mb-2 text-center text-lg-start">{property?.UnparsedAddress}</h1>
                        <div className="d-flex align-items-center gap-2">
                            <LuMapPin color='#fff' />
                            <span>{property?.City || 'Unknown City'}</span>
                        </div>
                    </div>
                </section>

                <div className="property-media py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Slider {...settings}>
                                    {property.images.length > 0 ? (
                                        property.images.map((img, index) => {
                                            return <img
                                                key={index}
                                                src={img || '/default.jpg'}
                                                alt={property?.UnparsedAddress || 'Property'}
                                                className="w-100 rounded"
                                                loading="lazy"
                                                style={{ height: '400px', objectFit: 'cover', objectPosition: 'center' }}
                                            />
                                        })
                                    ) : (
                                        <img
                                            src={property?.image_url || '/default.jpg'}
                                            alt={property?.UnparsedAddress || 'Property'}
                                            className="w-100 rounded"
                                            loading="lazy"
                                            style={{ height: '400px', objectFit: 'cover', objectPosition: 'center' }}
                                        />
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                <section className='single-property mt-5'>
                    <div className="container">
                        <h4>Description</h4><hr />
                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <p>{property?.PublicRemarks}</p>
                            </div>
                        </div>

                        <h5 className='fw-bold'>Property Details</h5><hr />
                        <div className="row gx-0 gx-lg-5 gy-0 mb-5">
                            <div className="col-md-6">
                                <table className='table'>
                                    <tr>
                                        <td><strong>Property ID:</strong></td>
                                        <td>{property?.listing_key || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Price:</strong></td>
                                        <td>${property?.ListPrice || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Property Size:</strong></td>
                                        <td>{property?.BuildingAreaTotal || property?.BuildingAreaUnits || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bedrooms:</strong></td>
                                        <td>{property?.BedroomsTotal || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bathrooms:</strong></td>
                                        <td>{property?.BathroomsTotalInteger || "N/A"}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <table className='table'>
                                    <tr>
                                        <td><strong>Garage:</strong></td>
                                        <td>{property?.GarageType || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Garage Size:</strong></td>
                                        <td>{property?.GarageParkingSpaces || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Year Built:</strong></td>
                                        <td>{property?.ListingContractDate || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Property Type:</strong></td>
                                        <td>{property?.PropertyType || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Property Status:</strong></td>
                                        <td>{property?.ContractStatus || "N/A"}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <h5 className='fw-bold'>Addional Details</h5><hr />
                        <div className="row gx-0 gx-lg-5 gy-0 mb-5">
                            <div className="col-6">
                                <table className='table'>
                                    <tr>
                                        <td><strong>Country:</strong></td>
                                        <td>{property?.Country || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cross Street:</strong></td>
                                        <td>{property?.CrossStreet || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>City Region:</strong></td>
                                        <td>{property?.CityRegion || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Elevator Type:</strong></td>
                                        <td>{property?.ElevatorType || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Expiration Date:</strong></td>
                                        <td>{property?.ExpirationDate || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Lot Size Dimension:</strong></td>
                                        <td>{property?.LotDepth || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Architectural Style:</strong></td>
                                        <td>{property?.ArchitecturalStyle || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Transaction Type:</strong></td>
                                        <td>{property?.TransactionType || "N/A"}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="col-6">
                                <table className='table'>
                                    <tr>
                                        <td><strong>Heat Type:</strong></td>
                                        <td>{property?.HeatType || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Holdover Days:</strong></td>
                                        <td>{property?.HoldoverDays || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Listing Contract Date:</strong></td>
                                        <td>{property?.ListingContractDate || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>List Office Name:</strong></td>
                                        <td>{property?.ListOfficeName || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>List Price:</strong></td>
                                        <td>{property?.ListPrice || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Maximum Rental Months Term:</strong></td>
                                        <td>{property?.MaximumRentalMonthsTerm || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Minimum Rental Months Term:</strong></td>
                                        <td>{property?.MinimumRentalTermMonths || "N/A"}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <h5 className='fw-bold'>Features</h5><hr />
                        <div className="row gx-0 gx-lg-5 gy-0 mb-5">
                            <div className="col-6">
                                <table className='table'>
                                    <tr>
                                        <td><strong><FaSquareCheck style={{ marginTop: '-4px' }} /> &nbsp; Cooling:</strong></td>
                                        <td>{Array.isArray(property?.json_string?.Cooling) ? property?.json_string?.Cooling[0] || "N/A" : property?.json_string?.Cooling || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><FaSquareCheck style={{ marginTop: '-4px' }} /> &nbsp; Parking Spaces:</strong></td>
                                        <td>{property?.json_string?.ParkingSpaces || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><FaSquareCheck style={{ marginTop: '-4px' }} /> &nbsp; Pool Features:</strong></td>
                                        <td>{Array.isArray(property?.json_string?.PoolFeatures) ? property?.json_string?.PoolFeatures[0] || "N/A" : property?.json_string?.PoolFeatures || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong><FaSquareCheck style={{ marginTop: '-4px' }} /> &nbsp; Water:</strong></td>
                                        <td>{property?.json_string?.Water || "N/A"}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalId">Connect for More Details</button>
                        <LoginModal setProfile={setProfile} />
                    </div>
                </section>

                <div className="container mb-5">
                    <PropertySlider params={{ TransactionType: property.TransactionType }} slidesToShow={3} slidesToScroll={1} />
                </div>
            </div>
        </>
    );
};


export default SingleProperty;