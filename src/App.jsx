import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import NotFound from './pages/NotFound'
import Authenticate from './pages/Authenticate/Authenticate'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Properties from './pages/Properties'
import SingleProperty from './pages/SingleProperty'
import Contact from './pages/Contact/Contact'

const App = () => {
	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				<Route path='*' element={<NotFound />} />
				<Route path='/authenticate' element={<Authenticate />} />
				<Route path='/' element={<Layout><Home /></Layout>} />
				<Route path='/about' element={<Layout><About /></Layout>} />
				<Route path='/properties' element={<Layout><Properties /></Layout>} />
				<Route path='/properties/:listingKey' element={<Layout><SingleProperty /></Layout>} />
				<Route path='/contact' element={<Layout><Contact /></Layout>} />
			</Routes>
		</Router>
	)
}

export default App