import { useCallback, useEffect } from 'react'
import _ from 'lodash'

const useAsync = ({
  setLoading,
  setValue,
  setError,
  func,
  params,
  getResKey,
}) => {
  const req = useCallback(async () => {
    try {
      const res = await func(params)
      setValue(_.get(res, getResKey))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [func, getResKey, params, setError, setLoading, setValue])
  useEffect(() => {
    req()
  }, [req])
}

export default useAsync
