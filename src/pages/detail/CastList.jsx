import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
import { motion } from "framer-motion"

const CastList = (props) => {
  const { category } = useParams()
  const [casts, setCasts] = useState([])
  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id)
      setCasts(res.cast.slice(0, 5))
    }
    getCredits()
  }, [category, props.id])
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {casts.map((item, i) => (
        <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer"
        >
          <div
            className="pt-[160px] bg-cover bg-center mb-3 rounded-xl shadow-lg border border-[#1f2126] transition-all group-hover:border-white/30"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}
          ></div>
          <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">{item.name}</p>
          <p className="text-gray-400 text-xs truncate">{item.character}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default CastList
