import axios from "axios"
import apiConfig from "./apiConfig"
import { getCached, setCache } from "./apiCache"

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    serialize: (params) => {
      const lng = localStorage.getItem("i18nextLng") || "en"
      const tmdbLang = lng === "id" ? "id-ID" : "en-US"
      const searchParams = new URLSearchParams()
      searchParams.append("api_key", apiConfig.apiKey)
      searchParams.append("language", tmdbLang)
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, params[key])
        }
      })
      return searchParams.toString()
    }
  }
})

// Cache-aware request interceptor
axiosClient.interceptors.request.use((config) => {
  const cacheKey = (config.baseURL || "") + config.url + JSON.stringify(config.params || {})
  const cached = getCached(cacheKey)
  if (cached) {
    config._cached = true
    config.adapter = () => Promise.resolve({ data: cached, status: 200, headers: {}, config })
  } else {
    config._cacheKey = cacheKey
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response.config && !response.config._cached && response.config._cacheKey && response.data) {
      setCache(response.config._cacheKey, response.data)
    }
    return response.data ?? response
  },
  (error) => { throw error }
)

export default axiosClient
