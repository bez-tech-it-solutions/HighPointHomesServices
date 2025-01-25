/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LuSearch, LuHistory } from 'react-icons/lu';
import { fetchApi } from '../../utils/fetchApi';
import { truncateText } from '../../utils/truncateText';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import './Search.css';

const Search = () => {
    const [keywords, setKeywords] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [history, setHistory] = useState(loadFromLocalStorage('searchHistory', []));
    const [showHistory, setShowHistory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedKeywords, setDebouncedKeywords] = useState('');
    const inputRef = useRef(null);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedKeywords(keywords.trim()), 500);
        return () => clearTimeout(timer);
    }, [keywords]);

    // Fetch search results when debouncedKeywords changes
    useEffect(() => {
        if (!debouncedKeywords) {
            setSearchResult([]);
            setLoading(false);
            return;
        }
        fetchSearchResults(debouncedKeywords);
    }, [debouncedKeywords]);

    // Save keyword to history and localStorage
    const saveToHistory = keyword => {
        const updatedHistory = [keyword, ...history.filter(item => item !== keyword)];
        setHistory(updatedHistory);
        saveToLocalStorage({ searchHistory: updatedHistory });
    };

    // Fetch search results
    const fetchSearchResults = async keyword => {
        setLoading(true);
        setError(null);
        try {
            await fetchApi({
                path: `/properties?search=${keyword}&limit=100`,
                setLoading,
                setState: response => {
                    if (response.status === 200) {
                        setSearchResult(response.data || []);
                        saveToHistory(keyword);
                    } else {
                        console.log(response);
                        setError('Result Not Found');
                    }
                }
            });
        } catch (error) {
            setError('Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle history click
    const handleHistoryClick = keyword => {
        setKeywords(keyword);
        setShowHistory(false);
    };

    return (
        // <div className="search" onBlur={() => setShowHistory(false)}>
        <div className="search">
            {/* Search Input */}
            <div className="search-input-wrapper">
                <input
                    type="text"
                    name="search"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    onFocus={() => setShowHistory(!showHistory)}
                    className="form-control"
                    placeholder="Address, Street Name, or Listing #"
                    aria-label="Search properties"
                    ref={inputRef}
                />
                <LuSearch />
            </div>

            {/* Search History */}
            {showHistory && history.length > 0 && (
                <div className="result bg-light" role="listbox">
                    {history.map((keyword, index) => (
                        <div
                            key={index}
                            className="d-flex gap-3 mb-2 align-items-center"
                            onClick={() => handleHistoryClick(keyword)}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="text-muted"><LuHistory /></span>
                            <span>{keyword}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Search Results */}
            {loading || error || searchResult.length > 0 ? (
                <div className="result bg-light" role="listbox" aria-live="polite">
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <h5 className="text-danger">{error}</h5>
                    ) : searchResult.length > 0 ? (
                        <>
                            {searchResult.slice(0, 5).map((item, index) => (
                                <Link to={`/properties/${item.listing_key}`} key={index}>
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={item.image_url || "/default.jpg"}
                                                    className="rounded-start"
                                                    alt="Property"
                                                    style={{ width: '100%', height: '130px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.City}</h5>
                                                    <p className="card-text">
                                                        <small className="text-body-secondary">
                                                            {truncateText(item.PublicRemarks, 70)}
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {searchResult.length > 5 && (
                                <h6><Link to="/properties">See more</Link></h6>
                            )}
                        </>
                    ) : (
                        <h5>No results found</h5>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Search;