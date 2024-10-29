export interface ElasticSearch<T> {
  hits: {
    total: {
      value: number
    },
    hits: SearchHit<T>[]
  }
}

export interface SearchHit<T> {
  _source: T
}
