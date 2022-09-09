import { useEffect, useRef, useState } from 'react'
import { Clipboard } from 'react-native'

export function useCopyToClipboard(value) {
  const [copied, setCopied] = useState(false)

  const timeout = useRef()

  function handleCopy() {
    setCopied((prevState) => !prevState)

    Clipboard.setString(value)

    timeout.current = setTimeout(() => {
      setCopied((prevState) => !prevState)
    }, 4000)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return [copied, handleCopy]
}
