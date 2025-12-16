import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Navigation } from "swiper/modules"
import { motion, AnimatePresence } from "framer-motion"
import tmdbApi, { movieType } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
import { useNavigate } from "react-router-dom"
import Button, { OutlineButton } from "../button/Button"

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, { params })
        setMovieItems(response.results.slice(0, 5))
      } catch {
        console.log("Error loading movies")
      }
    }
    getMovies()
  }, [])

  return (
    <div className="hero-slide relative group">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1000}
        className="w-full h-[70vh] lg:h-[90vh]"
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem item={item} active={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const HeroSlideItem = ({ item, active }) => {
  let navigate = useNavigate()
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/40 to-transparent z-10" />
      
      <div className="absolute w-full h-full flex items-center justify-start px-8 lg:px-24 z-20 pt-20">
        <div className="w-full lg:w-[55%]">
            <AnimatePresence mode="wait">
                {active && (
                   <motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl tracking-wide"
                        >
                            {item.title}
                        </motion.h2>
                        <motion.p 
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                             className="text-gray-200 text-sm lg:text-lg mb-8 line-clamp-3 font-medium drop-shadow-lg pr-10 max-w-xl"
                        >
                            {item.overview}
                        </motion.p>
                        <motion.div 
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                             className="flex gap-4"
                        >
                            <Button onClick={() => navigate("/movie/" + item.id)} className="shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] !py-3 !px-8 text-lg">
                                Watch Now
                            </Button>
                            <OutlineButton className="!py-3 !px-8 text-lg backdrop-blur-sm" onClick={() => console.log('Trailer')}>
                                Watch Trailer
                            </OutlineButton>
                        </motion.div>
                   </motion.div>
                )}
            </AnimatePresence>
        </div>
        
        <div className="hidden lg:block lg:w-[45%] h-full relative z-10">
            {active && (
                <motion.img 
                    initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    src={apiConfig.w500Image(item.poster_path)}
                    className="w-[350px] h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] absolute right-24 top-1/2 -translate-y-1/2 hover:rotate-2 hover:scale-105 transition-all duration-500 cursor-pointer border border-white/10"
                    alt=""
                />
            )}
        </div>
      </div>
    </div>
  )
}

export default HeroSlide
