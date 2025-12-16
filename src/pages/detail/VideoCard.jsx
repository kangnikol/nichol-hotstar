import React from "react"
import { motion } from "framer-motion"

const VideoCard = (props) => {
  const item = props.item
  const bg = `https://img.youtube.com/vi/${item.key}/mqdefault.jpg`

  return (
    <div className="flex flex-col gap-2" onClick={props.onClick}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative pt-[56.25%] bg-cover bg-center rounded-xl cursor-pointer shadow-lg group overflow-hidden border border-[#1f2126] hover:border-white/50 transition-colors"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-play text-white ml-1"></i>
            </div>
        </div>
      </motion.div>
      <h3 className="text-white text-sm font-medium truncate">{item.name}</h3>
    </div>
  )
}

export default VideoCard
