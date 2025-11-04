const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function handleResponse(response) {
	if (response.status === 204) {
		return null
	}

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Request failed')
	}

	return data
}

export async function getCategories() {
	const response = await fetch(`${API_BASE_URL}/api/categories`)
	return handleResponse(response)
}

export async function createCategory(name) {
	const response = await fetch(`${API_BASE_URL}/api/categories`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({name}),
	})
	return handleResponse(response)
}

export async function deleteCategory(id) {
	const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
		method: 'DELETE',
	})
	return handleResponse(response)
}

// Blog API functions
export async function getBlogs() {
	const response = await fetch(`${API_BASE_URL}/api/blogs`)
	return handleResponse(response)
}

export async function createBlog(formData) {
	const response = await fetch(`${API_BASE_URL}/api/blogs`, {
		method: 'POST',
		body: formData, // FormData for file upload
	})
	return handleResponse(response)
}

export async function updateBlog(id, formData) {
	const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
		method: 'PUT',
		body: formData, // FormData for file upload
	})
	return handleResponse(response)
}

export async function deleteBlog(id) {
	const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
		method: 'DELETE',
	})
	return handleResponse(response)
}

export async function getBlogsByCategory(slug) {
	const response = await fetch(`${API_BASE_URL}/api/blogs/category/${slug}`)
	return handleResponse(response)
}

export async function getBlogById(id) {
	const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`)
	return handleResponse(response)
}
