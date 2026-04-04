import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { OutlineButton } from "../components/button/Button"
import HeroSlide from "../components/heroSlide/HeroSlide"
import MovieList from "../components/movieList/MovieList"
import { category, movieType, tvType } from "../api/tmdbApi"
import AnimatedPage from "../components/common/AnimatedPage"
import ScrollReveal from "../components/common/ScrollReveal"
import { useTranslation } from "react-i18next"
import HistoryList from "../components/historyList/HistoryList"

const Home = () => {
  const { t } = useTranslation()
  const [hasHistory, setHasHistory] = useState(false)

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("hotstar_history") || "[]")
    setHasHistory(history.length > 0)
  }, [])

  return (
    <AnimatedPage>
      <HeroSlide />
      <div className="px-8 lg:px-12 h-max max-w-[1700px] mx-auto relative z-20 mt-8 lg:mt-12">
        {hasHistory && (
           <ScrollReveal delay={0.1} className="section mb-12">
             <div className="section-header mb-6 flex justify-between items-end">
               <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">{t("Continue Watching")}</h2>
             </div>
             <HistoryList />
           </ScrollReveal>
        )}
        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">{t("Trending Movies")}</h2>
            <Link to="/movie">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">{t("View More")}</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">{t("Top Rated Movies")}</h2>
            <Link to="/movie">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">{t("View More")}</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">{t("Trending TV")}</h2>
            <Link to="/tv">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">{t("View More")}</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">{t("Top Rated TV")}</h2>
            <Link to="/tv">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">{t("View More")}</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </ScrollReveal>
      </div>
    </AnimatedPage>
  )
}

export default Home
