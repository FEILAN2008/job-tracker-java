import { Link } from 'react-router-dom'

function App() {
    return (
        <div>
            <h1>Welcome to Job Tracker</h1>
            <Link to="/applications">
                <button>Go to Applications</button>
            </Link>
        </div>
    )
}

export default App
