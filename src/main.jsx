import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from "@react-oauth/google";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

import { store } from './redux/store'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HelmetProvider>
			<GoogleOAuthProvider clientId={'517819428962-t7q060chkurjip3micndp88mp6rgl9qt.apps.googleusercontent.com'}>
				<Provider store={store}>
					<App />
				</Provider>
			</GoogleOAuthProvider>
		</HelmetProvider>
	</StrictMode>,
)