import React from "react"
import { Link } from "react-router-dom"
import { category } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
import { motion } from "framer-motion"

const MovieCard = (props) => {
  const item = props.item
  const link = "/" + category[props.category] + "/" + item.id
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)
  
  return (
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
      <h3 className="text-white text-base font-semibold truncate group-hover:text-primary transition-colors">{item.title || item.name}</h3>
    </Link>
  )
}

export default MovieCard
