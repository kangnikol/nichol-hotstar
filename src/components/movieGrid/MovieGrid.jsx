import React, { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MovieCard from "../movieCard/MovieCard"
import Button, { OutlineButton } from "../button/Button"
import Input from "../input/Input"
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi"
import { useTranslation } from "react-i18next"

const MovieGrid = (props) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const { keyword } = useParams()

  const fetchData = useCallback(async (pageNum) => {
    let response = null
    if (keyword === undefined) {
      const params = { page: pageNum }
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, { params })
          break
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params })
      }
    } else {
      response = await tmdbApi.search(props.category, { params: { query: keyword, page: pageNum } })
    }
    return response
  }, [props.category, keyword])

  useEffect(() => {
    const init = async () => {
      const response = await fetchData(1)
      setItems(response.results)
      setTotalPage(response.total_pages)
      setPage(1)
    }
    init()
  }, [fetchData])

  const loadMore = async () => {
    const nextPage = page + 1
    const response = await fetchData(nextPage)
    setItems(prev => [...prev, ...response.results])
    setPage(nextPage)
  }

  return (
    <>
      <div className="mb-12">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-12">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="text-center">
          <OutlineButton className="small" onClick={loadMore}>
            {t("Load More")}
          </OutlineButton>
        </div>
      ) : null}
    </>
  )
}

const MovieSearch = (props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "")
  
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`)
    }
  }, [keyword, props.category, navigate])

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault()
      if (e.keyCode === 13) {
        goToSearch()
      }
    }
    document.addEventListener("keyup", enterEvent)
    return () => {
      document.removeEventListener("keyup", enterEvent)
    }
  }, [keyword, goToSearch])

  return (
    <div className="flex items-center justify-center mb-8">
      <Input
        type="text"
        placeholder={t("Enter Title")}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small ml-2" onClick={goToSearch}>{t("Search")}</Button>
    </div>
  )
}

export default MovieGrid
