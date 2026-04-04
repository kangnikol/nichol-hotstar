import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbApi from "../../api/tmdbApi"
import VideoCard from "./VideoCard"
import VideoModal from "../../components/common/VideoModal"
import ScrollReveal from "../../components/common/ScrollReveal"
import { useTranslation } from "react-i18next"

const VideoList = (props) => {
  const { category } = useParams()
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, props.id)
      setVideos(res.results.slice(0, 5))
    }
    getVideos()
  }, [category, props.id])

  const handleVideoClick = (key) => {
    setSelectedVideo(key)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  if (videos.length === 0) return null

  return (
    <ScrollReveal delay={0.1}>
      <h2 className="text-2xl font-semibold mb-6 border-l-4 border-primary pl-3">{t("Trailers & Clips")}</h2>
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {videos.map((item, i) => (
          <SwiperSlide key={i} className="!w-[80%] md:!w-[40%] lg:!w-[25%] px-2">
            <VideoCard item={item} onClick={() => handleVideoClick(item.key)} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {selectedVideo && (
        <VideoModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            videoKey={selectedVideo} 
        />
      )}
    </ScrollReveal>
  )
}

export default VideoList
