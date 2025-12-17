import React, { Fragment, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import apiConfig from "../../api/apiConfig"
import tmdbApi, { category as cate } from "../../api/tmdbApi"
import VideoList from "./VideoList"
import MovieList from "../../components/movieList/MovieList"
import CastList from "./CastList"
import { format } from "date-fns"
import Button from "../../components/button/Button"
import { Dialog, Transition } from "@headlessui/react"
import AnimatedPage from "../../components/common/AnimatedPage"
import ScrollReveal from "../../components/common/ScrollReveal"
import { motion } from "framer-motion"

const Detail = () => {
  const { category, id } = useParams()
  const [item, setItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    const getDetail = async () => {
      window.scrollTo(0, 0)
      const response = await tmdbApi.detail(category, id, { params: {} })
      setItem(response)
    }

    getDetail()
  }, [category, id])

  useEffect(() => {
    const setModalContent = async () => {
      if (item) {
        const videos = await tmdbApi.getVideos(category, item.id)

        if (videos.results.length > 0) {
          const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key
          iframeRef.current.setAttribute("src", videoSrc)
        } else {
          iframeRef.current.innerHTML = "No trailer"
        }
      }
    }

    if (isModalOpen && item) {
      setModalContent()
    }
  }, [isModalOpen, item])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const time_convert = (num) => {
    const hours = Math.floor(num / 60)
    const minutes = num % 60
    return hours + " hr " + minutes + " min"
  }

  return (
    <AnimatedPage>
      {item && (
        <>
          <div className="relative w-full h-[60vh] lg:h-[85vh] bg-cover bg-center bg-no-repeat" 
               style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-10 flex flex-col lg:flex-row gap-10 items-end max-w-[1600px] mx-auto">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:block w-[350px] shrink-0"
                 >
                     <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} className="rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10" />
                 </motion.div>
                 
                 <div className="flex-1 text-white">
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl lg:text-7xl font-bold mb-4 drop-shadow-2xl leading-tight"
                      >
                          {item.title || item.name}
                      </motion.h1>
                       
                       <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-4 text-gray-300 font-medium text-lg mb-6"
                       >
                            <span className="bg-white/10 px-2 py-1 rounded text-sm">{item.runtime ? time_convert(item.runtime) : (item.seasons ? item.seasons[0].season_number + " Season" : "")}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <span>{item.release_date || item.first_air_date ? format(new Date(item.release_date || item.first_air_date), "yyyy") : ""}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <div className="flex gap-2">
                                {item.genres && item.genres.slice(0, 3).map((genre, i) => (
                                    <span key={i} className="text-primary font-bold">{genre.name}</span>
                                ))}
                            </div>
                       </motion.div>
                       
                       <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-gray-200 text-lg leading-relaxed max-w-3xl mb-8 drop-shadow-md"
                       >
                           {item.overview}
                       </motion.p>
                       
                       <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                       >
                           <Button onClick={openModal} className="flex items-center gap-3 text-xl px-10 py-4 !bg-white !text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                              <i className="fa-solid fa-play"></i> Watch Trailer
                           </Button>
                       </motion.div>
                 </div>
              </div>
          </div>
          
          <div className="px-8 lg:px-12 py-10 text-white max-w-[1600px] mx-auto space-y-16">
            <ScrollReveal>
                <h2 className="text-2xl font-semibold mb-6 border-l-4 border-primary pl-3">Cast</h2>
                <CastList id={item.id} />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
               <h2 className="text-2xl font-semibold mb-6 border-l-4 border-primary pl-3">Trailers & Clips</h2>
               <VideoList id={item.id} />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
               <div className="section-header mb-6">
                   <h2 className="text-2xl font-semibold border-l-4 border-primary pl-3">More Like This</h2>
               </div>
               <MovieList category={category} type="similar" id={item.id} />
            </ScrollReveal>
            
             <TrailerDialog
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              item={item.id}
              ref={modalRef}
              iframeRef={iframeRef}
            />
          </div>
        </>
      )}
    </AnimatedPage>
  )
}

const TrailerDialog = React.forwardRef(
  ({ isOpen, onClose, item, iframeRef }, ref) => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100]"
          open={isOpen}
          onClose={onClose}
          ref={ref}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#1a1c22] p-2 align-middle shadow-xl transition-all">
                  <div className="relative pt-[56.25%] bg-black w-full">
                    <iframe
                      ref={iframeRef}
                      className="absolute top-0 left-0 w-full h-full"
                      title="trailer"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
)

export default Detail
