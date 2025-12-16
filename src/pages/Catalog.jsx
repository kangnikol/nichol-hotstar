import React from "react"

import { useParams } from "react-router-dom"
import PageHeader from "../components/pageHeader/PageHeader"
import { category as cate } from "../api/tmdbApi"
import MovieGrid from "../components/movieGrid/MovieGrid"
import AnimatedPage from "../components/common/AnimatedPage"

const Catalog = () => {
  const { category } = useParams()
  return (
    <AnimatedPage>
      <PageHeader>{category === cate.movie ? "Movie" : "TV Series"}</PageHeader>
      <div className="h-max">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Catalog
