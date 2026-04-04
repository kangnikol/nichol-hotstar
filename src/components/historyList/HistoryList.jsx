import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router-dom"
import apiConfig from "../../api/apiConfig"
import { motion } from "framer-motion"

const HistoryList = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("hotstar_history") || "[]")
    setItems(history)
  }, [])

  if (items.length === 0) return null

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {items.map((item, i) => {
          let link = `/play/${item.category}/${item.id}`
          if (item.category === "tv" && item.season && item.episode) {
             link += `?season=${item.season}&episode=${item.episode}`
          }

          const bg = apiConfig.w500Image(item.poster_path)
          // Progress calculation: runTime from TMDB is in minutes. Vidking currentTime is seconds.
          const progressPercent = item.runTime > 0 && item.progress > 0 
              ? Math.min((item.progress / (item.runTime * 60)) * 100, 100) 
              : 0

          return (
            <SwiperSlide key={i} className="!w-[40%] md:!w-[30%] lg:!w-[15%]">
               <Link to={link}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative bg-top bg-no-repeat pt-[160%] rounded-xl mb-4 bg-cover group overflow-hidden shadow-lg border border-[#1f2126]"
                    style={{ backgroundImage: `url(${bg})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50 backdrop-blur-md">
                            <i className="fa-solid fa-play text-white ml-1"></i>
                         </div>
                    </div>
                  </motion.div>
                  <h3 className="text-white text-base font-semibold truncate group-hover:text-primary transition-colors">{item.title}</h3>
                  {item.category === 'tv' && item.season && (
                     <p className="text-xs text-gray-400 font-semibold mt-1">S{item.season} E{item.episode}</p>
                  )}
                  {progressPercent > 0 && (
                     <div className="w-full bg-gray-700 h-1.5 mt-2 rounded overflow-hidden">
                        <div className="bg-primary h-1.5 rounded transition-all" style={{ width: `${progressPercent}%` }}></div>
                     </div>
                  )}
               </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default HistoryList
