import axios from "axios";
import CryptoJS from "crypto-js";



const CONSUMER_KEY = "ck_63677d4acb9d84969e1622ac6db0ec62d23b2b78";
const CONSUMER_SECRET = "cs_e07316da1d59af5462b36e1bae9a6a16c53c75a5";

const PROJECT_URL ="http://headless-store.local/"

const API_URL = PROJECT_URL + "wp-json/wc/v3"

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