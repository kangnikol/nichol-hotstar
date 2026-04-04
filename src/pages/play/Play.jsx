import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import AnimatedPage from "../../components/common/AnimatedPage"
import { useTranslation } from "react-i18next"
import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

const Play = () => {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const [details, setDetails] = useState(null)
  
  const searchParams = new URLSearchParams(location.search)
  const season = searchParams.get("season") || 1
  const episode = searchParams.get("episode") || 1

  // Default param strings. These might not be strictly supported by Vidking, but handles edge embedders.
  const queryStrings = "?autoplay=1&sub=id&audio=original"

  const videoSrc = category === "movie" 
      ? `https://www.vidking.net/embed/movie/${id}${queryStrings}` 
      : `https://www.vidking.net/embed/tv/${id}/${season}/${episode}${queryStrings}`

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Fetch details to save to history
    const fetchInfo = async () => {
      try {
        const item = await tmdbApi.detail(category, id, { params: {} })
        setDetails(item)
        
        // Push initial play record
        saveToHistory(item, 0)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInfo()
  }, [category, id, season, episode])

  const saveToHistory = (itemData, progress) => {
    if (!itemData) return
    const history = JSON.parse(localStorage.getItem("hotstar_history") || "[]")
    const newEntry = {
      id: itemData.id,
      category,
      title: itemData.title || itemData.name,
      poster_path: itemData.poster_path,
      timestamp: Date.now(),
      season: category === "tv" ? parseInt(season) : null,
      episode: category === "tv" ? parseInt(episode) : null,
      progress: progress || 0,
      runTime: itemData.runtime || 0
    }

    // Filter out same item
    const filtered = history.filter(h => !(h.id === newEntry.id && h.category === newEntry.category))
    
    // Add to front
    filtered.unshift(newEntry)
    
    // Keep max 20
    if (filtered.length > 20) filtered.pop()
    
    localStorage.setItem("hotstar_history", JSON.stringify(filtered))
  }

  // Attempt to listen for Vidking progress
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        // Many embedders send JSON strings.
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data
        if (data && data.event === "timeupdate" || data.currentTime) {
          // Vidking might send progress data
          const current = data.currentTime || data.time || 0
          if (details) saveToHistory(details, current)
        }
      } catch (e) {}
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [details, category, id, season, episode])

  return (
    <AnimatedPage>
      <div className="w-full min-h-[80vh] flex flex-col bg-[#0B1120]">
        <div className="container mx-auto px-4 py-8 mt-20">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors mb-6 text-xl group w-max z-20 relative"
          >
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> 
            <span className="font-semibold">{t("Back to Details")}</span>
          </button>
          
          <div className="relative w-full aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={videoSrc}
              title="Vidking Player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Play
