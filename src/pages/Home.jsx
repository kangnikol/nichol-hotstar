import React from "react"
import { Link } from "react-router-dom"
import { OutlineButton } from "../components/button/Button"
import HeroSlide from "../components/heroSlide/HeroSlide"
import MovieList from "../components/movieList/MovieList"
import { category, movieType, tvType } from "../api/tmdbApi"
import AnimatedPage from "../components/common/AnimatedPage"
import ScrollReveal from "../components/common/ScrollReveal"

const Home = () => {
  return (
    <AnimatedPage>
      <HeroSlide />
      <div className="px-8 lg:px-12 h-max max-w-[1700px] mx-auto relative z-20 mt-8 lg:mt-12">
        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1} className="section mb-12">
          <div className="section-header mb-6 flex justify-between items-end">
            <h2 className="text-white text-xl lg:text-2xl font-semibold border-l-4 border-primary pl-3">Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small !py-1 !px-4 text-xs lg:text-sm">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </ScrollReveal>
      </div>
    </AnimatedPage>
  )
}

export default Home
