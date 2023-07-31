import React from 'react'
import { FormEvent, useEffect, useState } from 'react'
import { Character, fetchCharacters } from 'src/services/marvel.service'
import ChevronRight from 'src/svgs/ChevronRight'
import Search from 'src/svgs/Search'

import css from 'styles/Marvel.module.scss'

const MarvelPage = () => {
  const [characters, setCharacters] = useState<Character[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetchCharacters({ page, search })
      .then((_characters) => {
        if (characters) {
          setCharacters([...characters, ..._characters])
        } else {
          setCharacters(_characters)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [page])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    fetchCharacters({ search })
      .then((characters) => {
        console.log(characters)
        setCharacters(characters)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
    return false
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1>Marvel characters</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={css.search}>
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className={css.button}>
              <Search />
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <p>Cargando ...</p>
      ) : characters && characters.length ? (
        <>
          <div className={css.content}>
            {characters.map((character) => (
              <a key={character.id} href={`/marvel/${character.id}`} className={css.card}>
                <div className={css.image}>
                  <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                </div>
                <div className={css.text}>
                  <div>{character.name}</div>
                  <div>
                    <ChevronRight />
                  </div>
                </div>
              </a>
            ))}
          </div>
          {characters.length >= 20 && (
            <div className={css.more}>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}
              >
                LOAD MORE
              </a>
            </div>
          )}
        </>
      ) : (
        <p>No hubo resultados para mostrar.</p>
      )}
    </div>
  )
}

export default MarvelPage
