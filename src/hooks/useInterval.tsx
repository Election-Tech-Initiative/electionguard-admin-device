import { useEffect, useRef } from 'react'

const UseInterval = (callback: () => void, delay: number | undefined) => {
  const currentCallback = useRef(() => {})

  useEffect(() => {
    currentCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      currentCallback.current()
    }

    if (delay !== undefined) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }

    return () => {}
  }, [delay])
}

export default UseInterval
