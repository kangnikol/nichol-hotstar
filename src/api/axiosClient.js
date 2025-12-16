import axios from "axios"
import apiConfig from "./apiConfig"

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams()
      // Add api_key to all requests
      searchParams.append("api_key", apiConfig.apiKey)
      
      // Append other params
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, params[key])
        }
      })
      
      return searchParams.toString()
    }
  }
})

axiosClient.interceptors.request.use(async (config) => config)

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
