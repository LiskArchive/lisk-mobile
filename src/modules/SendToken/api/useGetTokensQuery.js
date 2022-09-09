/* eslint-disable max-statements */
import { useState, useEffect, useRef } from 'react'

import { mockTokens } from '../__fixtures__'

/**
 * @typedef {Object} GetTokensQuery
 * @property {Array} data - The tokens returned data.
 * @property {Object} meta - The metadata of the tokens data
 *  (total, count and offset).
 * @property {boolean} isLoading - Flag that indicates if the initial data
 * request is loading or not.
 * @property {boolean} isFetching - Flag that indicates if an additional
 * network request is being executed.
 * @property {Object} error - An error object, if any request to fetch
 * the data fails.
 * @property {Function} refetch - Callback to fetch all data again from server.
 * @property {Function} fetMore - Callback to fetch paginated data.
 */

/**
 * Hook for fetching tokens metadata and manage the network
 * request state.
 * @returns {...GetTokensQuery} The query state.
 */
export function useGetTokensQuery(address) {
  // TODO: Replace data, isLoading and error
  // by React Query when package integration is done.
  const [data, setData] = useState(undefined)
  const [meta, setMeta] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(undefined)
  const [page, setPage] = useState(0)

  const timer = useRef()

  function fetchData() {
    // TODO: Replace with real API call when backend is available.
    return new Promise((resolve) => {
      timer.current = setTimeout(() => {
        resolve({
          data: mockTokens,
          meta: {
            address,
            count: 10,
            offset: 0,
            total: 120,
          },
        })
      }, 250)
    })
  }

  // TODO: Replace with real API call when backend is available.
  function fetchMoreData() {
    if (!isLoading) {
      setIsFetching(true)

      new Promise((resolve) => {
        timer.current = setTimeout(() => {
          resolve({
            data: mockTokens,
            meta: {
              count: 10,
              offset: page + 1,
              total: 150,
            },
          })
        }, 250)
      })
        .then((res) => {
          const newData = res.data.map((app, index) => ({
            ...app,
            chainId: `${app.chainID}-refetch${index}`,
          }))

          setData([...data, ...newData])
          setMeta(res.meta)
          setPage(page + 1)
          setIsFetching(false)
        })
        .catch((e) => {
          setError(e)
          setIsFetching(false)
        })
    }
  }

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res.data)
        setMeta(res.meta)
        setIsLoading(false)
      })
      .catch((e) => setError(e))

    return () => {
      clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data,
    meta,
    isLoading,
    error,
    isError: !!error,
    refetch: fetchData,
    fetchMore: fetchMoreData,
    isFetching,
  }
}
