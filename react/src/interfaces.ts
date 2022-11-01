export interface Movie {
  'title': string
  'poster_path': string
  'overview': string
  'vote_average': string
  'release_date': string
  'id': string
}

export interface MovieObj extends Movie {
  'poster': string
  'vote': string
  'date': string
}

export interface Props {
  'id': string
  'title': string
  'movies': Movie[]
  'isFetching': boolean
}

export interface HistoryState {
  movies?: Movie[]
  title?: string
}
