import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h1 className='mb-4'>Not Found</h1>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
    )
}

export default NotFound