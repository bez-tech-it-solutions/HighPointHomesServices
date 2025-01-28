import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import NotFound from './pages/NotFound'
import Register from './pages/Authenticate/Register'
import Login from './pages/Authenticate/Login'
import ForgetPassword from './pages/Authenticate/ForgetPassword'
import ResetPassword from './pages/Authenticate/ResetPassword'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Properties from './pages/Properties'
import SingleProperty from './pages/SingleProperty'
import Contact from './pages/Contact/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'


const App = () => {
	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<Routes>
				<Route path='*' element={<NotFound />} />

				<Route path='/auth/register' element={<Register />} />
				<Route path='/auth/login' element={<Login />} />
				<Route path='/auth/forget-password' element={<ForgetPassword />} />
				<Route path='/auth/reset-password/:token' element={<ResetPassword />} />

				<Route path='/' element={<Layout><Home /></Layout>} />
				<Route path='/about' element={<Layout><About /></Layout>} />
				<Route path='/properties' element={<Layout><Properties /></Layout>} />
				<Route path='/properties/:listingKey' element={<Layout><SingleProperty /></Layout>} />
				<Route path='/contact' element={<Layout><Contact /></Layout>} />
				<Route path='/privacy-policy' element={<Layout><PrivacyPolicy /></Layout>} />
			</Routes>
		</Router>
	)
}

export default App