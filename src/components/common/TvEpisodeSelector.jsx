import React, { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useNavigate } from "react-router-dom"
import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
import { useTranslation } from "react-i18next"

const TvEpisodeSelector = ({ isOpen, onClose, item }) => {
  const [activeSeason, setActiveSeason] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (item && item.seasons && item.seasons.length > 0) {
      const s1 = item.seasons.find((s) => s.season_number === 1)
      setActiveSeason(s1 ? s1.season_number : item.seasons[0].season_number)
    }
  }, [item])

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (activeSeason === null || !item) return
      setIsLoading(true)
      try {
        const response = await tmdbApi.tvSeason(item.id, activeSeason)
        setEpisodes(response.episodes)
      } catch (err) {
        console.error("Failed fetching episodes", err)
      }
      setIsLoading(false)
    }
    
    if (isOpen) {
      fetchEpisodes()
    }
  }, [activeSeason, isOpen, item])

  if (!item) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-[#1a1c22] border border-white/10 p-6 align-middle shadow-2xl transition-all">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                   <h3 className="text-2xl font-bold text-white">
                      {t("Select Episode")}
                   </h3>
                   <button onClick={onClose} className="text-gray-400 hover:text-white transition cursor-pointer">
                      <i className="fa-solid fa-xmark text-2xl"></i>
                   </button>
                </div>
                
                {/* Season Tabs */}
                <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
                   {item.seasons && item.seasons.map((season) => (
                      <button 
                        key={season.id}
                        onClick={() => setActiveSeason(season.season_number)}
                        className={`px-4 py-2 whitespace-nowrap rounded-lg font-semibold transition-colors ${activeSeason === season.season_number ? 'bg-primary text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                      >
                         {season.name}
                      </button>
                   ))}
                </div>

                {/* Episode List */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                   {isLoading ? (
                     <div className="col-span-full py-10 text-center text-gray-400">{t("Loading...")}</div>
                   ) : (
                     episodes.map(epi => (
                        <div 
                           key={epi.id} 
                           onClick={() => navigate(`/play/tv/${item.id}?season=${activeSeason}&episode=${epi.episode_number}`)}
                           className="flex flex-col gap-2 cursor-pointer group"
                        >
                           <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5">
                              {epi.still_path ? (
                              <img src={apiConfig.w500Image(epi.still_path)} alt={epi.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center border border-white/5 bg-black">No Image</div>
                              )}
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                 <i className="fa-solid fa-play text-white text-xl shadow-lg"></i>
                              </div>
                           </div>
                           <div className="text-sm">
                              <span className="text-primary font-bold mr-2">E{epi.episode_number}</span>
                              <span className="text-gray-200 group-hover:text-primary transition-colors line-clamp-1" title={epi.name}>{epi.name}</span>
                           </div>
                        </div>
                     ))
                   )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TvEpisodeSelector
