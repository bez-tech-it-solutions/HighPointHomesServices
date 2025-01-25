/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <nav className="my-5">
            <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => handlePageChange(index + 1)}>
                        <button className="page-link">{index + 1}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination