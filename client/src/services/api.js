import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Auth APIs
export const login = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_BASE_URL}/auth/register`, data);

// Product APIs
export const getProducts = () => axios.get(`${API_BASE_URL}/shop/products`);
export const getProductDetails = (id) => axios.get(`${API_BASE_URL}/shop/products/${id}`);

// Cart APIs
export const getCart = (userId) => axios.get(`${API_BASE_URL}/shop/cart/get/${userId}`);
export const addToCart = (userId, product) =>
  axios.post(`${API_BASE_URL}/shop/cart/add/${userId}`, product);
export const removeFromCart = (userId, productId) =>
  axios.delete(`${API_BASE_URL}/shop/cart/remove/${userId}/${productId}`);

// Order APIs
export const placeOrder = (userId, orderData) =>
  axios.post(`${API_BASE_URL}/shop/order/place/${userId}`, orderData);
export const getOrders = (userId) =>
  axios.get(`${API_BASE_URL}/shop/order/get/${userId}`);

// Review APIs
export const getReviews = (productId) =>
  axios.get(`${API_BASE_URL}/shop/review/${productId}`);
export const addReview = (productId, reviewData) =>
  axios.post(`${API_BASE_URL}/shop/review/${productId}`, reviewData);

// Feature Images
export const getFeatureImages = () =>
  axios.get(`${API_BASE_URL}/common/feature/images`);

// Add more API calls as needed
