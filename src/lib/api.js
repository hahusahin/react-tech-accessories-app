import axios from "axios";

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;

export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products.json`);
  const data = response.data;

  const transformedData = [];
  for (const key in data) {
    const obj = { id: key, ...data[key] };
    transformedData.push(obj)    
  }

  return transformedData
};

export const getProductDetails = async (productId) => {
  const [productInfo, productReviews] = await Promise.all([
    axios.get(`${BASE_URL}/products/${productId}.json`),
    axios.get(`${BASE_URL}/comments/${productId}.json`)
  ])

  const transformedReviews = []
  for (const key in productReviews.data) {
    const obj = { id: key, ...productReviews.data[key] };
    transformedReviews.push(obj)    
  }
  
  return {productInfo: productInfo.data, productReviews: transformedReviews}
}

export const sendOrder = async (orderData) => {
  await axios.post(`${BASE_URL}/orders.json`, orderData)
  return null;
}

export const sendReviewAndUpdateRating = async (data) => {
  await Promise.all([
    axios.post(`${BASE_URL}/comments/${data.productId}.json`, data.reviewData),
    axios.put(`${BASE_URL}/products/${data.productId}/rating.json`, data.rating)
  ])

  return null
}

export const sendSignUpCredentials = async (userData) => {
  const restEndPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
  const authResponse = await axios.post(restEndPoint, userData.credentials)
  const data = authResponse.data
  if(data && data.localId){
    await axios.put(`${BASE_URL}/users/${data.localId}.json`, userData.userInfo)
    return {userId: data.localId, token: data.idToken}
  } else {
    return null
  }
}

export const sendLoginCredentials = async (credentials) => {
  const restEndPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
  const response = await axios.post(restEndPoint, credentials)
  const data = response.data
  return {userId: data.localId, token: data.idToken}  
}

export const getUserDetails = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}.json`)
  const data = response.data
  return data
}