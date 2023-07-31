import axios from 'axios'
import crypto from 'crypto'

// Api Keys
const API_KEY = process.env.NEXT_PUBLIC_MARVEL_API_KEY
const API_PRIVATE = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY

// Urls
const BASE_API_URL = 'https://gateway.marvel.com'
const CHARACTER_API = `${BASE_API_URL}/v1/public/characters`

const DEFAULT_PAGE_SIZE = 20

export interface Character {
  id: number
  name: string
  thumbnail: {
    extension: string
    path: string
  }
}

interface IParams {
  search?: string
  page?: number
}

interface ApiParams {
  ts: number
  apikey: string | undefined
  hash: string
  nameStartsWith?: string
  offset?: string
}

export const fetchCharacters = async ({ search, page }: IParams = {}): Promise<Character[]> => {
  const ts = Date.now()
  const hashstring = `${ts}${API_PRIVATE}${API_KEY}`

  const params: ApiParams = {
    ts,
    apikey: API_KEY,
    hash: crypto.createHash('md5').update(hashstring).digest('hex'),
  }

  if (search) {
    params.nameStartsWith = search
  }

  if (page) {
    params.offset = (page * DEFAULT_PAGE_SIZE).toString()
  }

  const results = await axios.get(CHARACTER_API, {
    params,
  })

  return results.data.data.results
}
