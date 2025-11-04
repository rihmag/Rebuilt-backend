import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import AdminPanel from './pages/admin'
import CategoryPage from './pages/CategoryPage'
import BlogPage from './pages/BlogPage'
import Footer from './components/Footer'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/admin'
					element={<AdminPanel />}
				/>
				<Route
					path='/category/:slug'
					element={<CategoryPage />}
				/>
				<Route
					path='/blog/:id'
					element={<BlogPage />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
