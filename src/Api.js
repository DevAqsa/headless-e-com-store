import axios from "axios";
import CryptoJS from "crypto-js";



const CONSUMER_KEY = "ck_63677d4acb9d84969e1622ac6db0ec62d23b2b78";
const CONSUMER_SECRET = "cs_e07316da1d59af5462b36e1bae9a6a16c53c75a5";

const PROJECT_URL ="http://headless-store.local/"

const API_URL = PROJECT_URL + "wp-json/wc/v3"

const WP_USER_API_URL = `${PROJECT_URL}wp-json/wp/v2/users`

// Function to generate OAuth
const generateOAuthSignature = (url, method = 'GET', params = {}) => {
    const nonce = Math.random().toString(36).substring(2);
    const timestamp = Math.floor(Date.now() / 1000);
  
    const oauthParams = {
      oauth_consumer_key: CONSUMER_KEY,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_version: '1.0',
    };
  
    const allParams = { ...oauthParams, ...params };
  
    const paramString = Object.keys(allParams)
      .sort()
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
      .join('&');
  
    const baseUrl = url.split('?')[0]; // Ensure no query params in the base URL
    const baseString = `${method.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(paramString)}`;
    const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;
  
    const signature = CryptoJS.HmacSHA1(baseString, signingKey).toString(CryptoJS.enc.Base64);
  
    return { ...oauthParams, oauth_signature: encodeURIComponent(signature) };
  };

 const api = axios.create({
    baseURL: API_URL,

});

//get all products from woocommerce store

export const getAllProducts = async () => {
  

    try{

      const url = `${API_URL}/products`;
      const oauthParams = generateOAuthSignature(url);
      const response= await api.get("/products", {params: oauthParams});
      return response.data;


    } catch (error) {

        console.log(error)
    }
}


//get single product from woocommerce store by Id
export const getSingleProductData = async (id) => {
  try {
    const url = `${API_URL}/products/${id}`;
    const oauthParams = generateOAuthSignature(url);
    const response = await api.get(`/products/${id}`, { params: oauthParams });
    return response.data;
  }
  catch (error) {
    console.log(error)
  }
}


//registert user api
export const registerStoreUser = async (userInfo) => {

  try {
       const response = await api.post(WP_USER_API_URL, userInfo, {
       headers: {
      "Authorization" : "Basic " + btoa("headless-store:store")
  }
})

return response.data;

}catch (error) {
    console.log(error)
  }
}

//login user api
export const loginUser = async (userInfo) => {

  try{

    const response = await api.post(`${PROJECT_URL}wp-json/jwt-auth/v1/token`, userInfo)
    return response.data;

}catch (error) {
    console.log(error)
  }
}

export const createAnOrder = async(userInfo) => {
  try{

    const cartItems = JSON.parse(localStorage.getItem("cart")) || []
    
    // Check cart items
    if(!cartItems.length){
      console.log("Cart is empty")
      return false
    }

    const lineItems = cartItems.map( (item) => ({
      product_id: item.id,
      quantity: item.quantity
    }) )

    const data = {
      ...userInfo,
      line_items: lineItems
    }

    const url = `${API_URL}/orders`

    const oauthParams = generateOAuthSignature(url, "POST")

    // Generate Oauth Header
    const oauthHeader = Object.keys(oauthParams)
    .map( (key) => `${key}=${encodeURIComponent(oauthParams[key])}` )
    .join(", ")

    const response = await api.post("/orders", data, {
      headers: {
        Authorization: `OAuth ${oauthHeader}`
      }
    })

    return response.data
  } catch(error){
    console.log(error)
  }
}

//to get user Data
export const getLoggedInUserData = async(token) => {

  try{
    const response = await api.get(`${WP_USER_API_URL}/me`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    return response.data

  }catch(error){
    console.log(error)
  }
}


// Fetch all Orders by User Id
export const getOrdersByUserId = async(userId) => {

  try{

    const url = `${API_URL}/orders`

    const oauthParams = generateOAuthSignature(url, "GET", {
      customer: userId
    })

    const response = await api.get("/orders", {
     params : {
      ...oauthParams,
      customer: userId
     }
    })

    return response.data
  } catch(error){
    console.log(error)
  }
}